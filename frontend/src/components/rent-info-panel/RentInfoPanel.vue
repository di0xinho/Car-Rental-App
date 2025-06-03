<script setup lang="ts">
  import { Rent } from '@/utilities/models/rentModel';
  import { onMounted, ref, computed, type PropType } from 'vue';
  import { Loader } from '@googlemaps/js-api-loader';
  import { getCarTelemetryData } from '@/utilities/carUtils';

  const { rent } = defineProps({
    rent: {type: Object as PropType<Rent>, required: true}
  });

  const currentMileage = ref<number|null>(null);

  const distance = computed(() => {
    if (currentMileage.value) {
      return currentMileage.value - rent.carMileage.atStart
    }
  })

  let map: google.maps.Map | undefined;
  let position: {lat: number, lng: number} | undefined;
  let pin: google.maps.marker.AdvancedMarkerElement | undefined; 

  onMounted(async () => {
    const carTelemetry = getCarTelemetryData();
    position = carTelemetry.position;
    currentMileage.value = carTelemetry.mileage;

    // Loading Google Maps JavaScript API:
    // https://developers.google.com/maps/documentation/javascript/load-maps-js-api#js-api-loader
    const loader = new Loader({
      apiKey: import.meta.env.VITE_MAPS_API_KEY,
      version: "quarterly",
      language: "pl"
    });
    const google = await loader.load();
    //  Creating map with custom marker:
    //  https://developers.google.com/maps/documentation/javascript/examples/advanced-markers-graphics
    const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;

    map = new Map(document.getElementById('map') as HTMLElement, {
      center: position,
      zoom: 13,
      mapId: '15b155d742311675158f73e1',
    });

    const parser = new DOMParser();
    const pinSvgString = '<svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M46.8305 19.8956C46.493 16.1072 45.937 15.3694 45.727 15.0919C45.2442 14.4506 43.6542 13.5919 43.6542 13.5919L43.5376 13.4901L43.4787 13.3469L43.4899 13.1925L43.5689 13.0594C43.5689 13.0594 43.8366 12.7213 43.91 12.5186C43.9833 12.3158 44.0118 12.0995 43.9936 11.8847C43.9583 11.5037 43.7812 11.1499 43.4972 10.8934C43.2133 10.6369 42.8434 10.4965 42.4608 10.5H40.9983L40.6786 10.4681C40.6786 10.4681 38.6264 6.13031 36.1683 4.90687C32.5223 3.09375 25.8061 3 24.4936 3C23.1811 3 16.4648 3.09375 12.8236 4.90406C10.3655 6.1275 8.31327 10.4653 8.31327 10.4653L7.99171 10.5H6.5264C6.14379 10.4965 5.77385 10.6369 5.48992 10.8934C5.206 11.1499 5.02884 11.5037 4.99358 11.8847C4.97693 12.099 5.00676 12.3145 5.08102 12.5162C5.15529 12.718 5.42389 13.0538 5.42389 13.0538L5.50286 13.1869L5.51407 13.3413L5.45519 13.4844L5.33858 13.5863C5.33858 13.5863 3.74483 14.4478 3.26577 15.0863C3.05577 15.3675 2.50077 16.1016 2.16233 19.89C1.97483 22.0219 1.94671 24.2288 2.09389 25.65C2.40233 28.6031 2.98077 30.3881 3.00515 30.4622C3.09391 30.7317 3.25729 30.9705 3.47634 31.1509C3.69539 31.3313 3.96111 31.4458 4.24265 31.4812V31.5C4.24265 31.8978 4.40068 32.2794 4.68198 32.5607C4.96329 32.842 5.34482 33 5.74265 33H10.9926C11.3905 33 11.772 32.842 12.0533 32.5607C12.3346 32.2794 12.4926 31.5 12.4926 31.5L17.0817 30.7416C17.0817 30.7416 22.7864 30.375 24.4936 30.375C26.1661 30.375 32.0011 30.7416 32.0011 30.7416L36.4964 31.4991C36.4964 31.4991 36.6544 32.2784 36.9357 32.5597C37.217 32.841 37.5986 32.9991 37.9964 32.9991H43.2464C43.6442 32.9991 44.0258 32.841 44.3071 32.5597C44.5884 32.2784 44.7464 31.8969 44.7464 31.4991V31.4878C45.0286 31.4531 45.2951 31.3388 45.5149 31.1584C45.7347 30.978 45.8986 30.7388 45.9876 30.4688C46.012 30.3947 46.5905 28.6097 46.8989 25.6566C47.0461 24.2344 47.0198 22.0313 46.8305 19.8956ZM11.0245 11.7478C11.0245 11.7478 12.6323 8.35031 14.1595 7.59C16.3664 6.49125 20.9405 5.99625 24.4936 5.99625C28.0467 5.99625 32.6208 6.4875 34.8276 7.59C36.3548 8.35031 37.9626 11.7478 37.9626 11.7478C37.9626 11.7478 38.0016 11.8354 38.0564 11.9513C38.1112 12.0671 38.1268 12.3228 38.1268 12.3228L38.0069 12.6815L37.7272 12.9361L37.3589 13.0219C37.3589 13.0219 27.6811 12.6675 24.4936 12.6675C21.3061 12.6675 11.6236 13.0284 11.6236 13.0284L11.2552 12.9427L10.9756 12.6881L10.8557 12.3294L10.9261 11.9578L11.0245 11.7478ZM12.143 19.2131C10.5303 19.4072 8.90728 19.503 7.28296 19.5C6.28921 19.5 5.26452 19.2187 5.07421 18.3337C4.9439 17.7384 4.95796 17.4038 5.02827 17.0672C5.08733 16.7813 5.18108 16.5731 5.64983 16.5C6.86858 16.3125 7.55015 16.5478 9.54515 17.1356C10.868 17.5247 11.8223 18.0431 12.3661 18.4537C12.6389 18.6562 12.4936 19.185 12.143 19.2131ZM32.8973 26.9006C31.6636 27.0413 29.1961 26.9897 24.5217 26.9897C19.8473 26.9897 17.3808 27.0413 16.147 26.9006C14.8739 26.7591 13.2511 25.5553 14.3592 24.4828C15.097 23.7759 16.8183 23.2472 19.1105 22.95C21.4026 22.6528 22.373 22.5 24.5123 22.5C26.6517 22.5 27.5236 22.5937 29.9142 22.9509C32.3048 23.3081 34.1114 23.8434 34.6655 24.4837C35.6761 25.6312 34.1695 26.7516 32.8973 26.9062V26.9006ZM43.913 18.3328C43.7255 19.2216 42.6942 19.4991 41.7042 19.4991C40.0488 19.4994 38.3948 19.4037 36.7505 19.2122C36.4636 19.185 36.3305 18.6816 36.6211 18.4528C37.1564 18.0319 38.1211 17.5237 39.442 17.1347C41.437 16.5469 42.5873 16.3116 43.5755 16.5075C43.8164 16.5553 43.9439 16.8141 43.9589 16.9762C44.025 17.4278 44.0095 17.8867 43.913 18.3328Z" fill="#FE8400"/><path d="M33 38H17L25 47L33 38Z" fill="#FE8400"/></svg>'
    const pinSvg = parser.parseFromString(pinSvgString, 'image/svg+xml').documentElement;

    pin = new AdvancedMarkerElement({
      map,
      position: position,
      content: pinSvg,
      title: 'A marker using a custom SVG image.'
    });
  });

  function refreshCarTelemetryData () {
    // TO IMPLEMENT!!! GET CURRENT POSITION OF RENTED CAR
    position = { lat: 51.103538, lng: 17.039269 };
    if (map && pin) {
      map.setCenter(position);
      pin.position = position;
    }
  }
</script>

<template>
  <div class="flex flex-col lg:flex-row gap-8">
    <div class="basis-3xs shrink-0 grow bg-light-bg text-dark-txt rounded-3xl p-4">
      <!-- Refresh button -->
      <div class="my-4">
        <button @click="refreshCarTelemetryData" class="flex gap-3 ml-auto bg-light-tertiary border border-dominant-secondary px-4 py-1 rounded-full">
          <span class="text-sm/[22px]">Odśwież</span>
          <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g stroke="black" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
              <path d="M23 7L23 14C23 16.2091 21.2091 18 19 18L6 18"/>
              <path d="M1 15L1 8C1 5.79086 2.79086 4 5 4L18 4"/>
              <path d="M9 21L6 18L9 15"/>
              <path d="M15 7L18 4L15 1"/>
            </g>
          </svg>
        </button>
      </div>
      <!-- Rent information list -->
      <dl class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-1 gap-4">
        <div>
          <dt class="text-sm text-neutral-600 mb-4">Wynajem</dt>
          <dd class="mx-4"><span class="text-sm text-neutral-600">od</span> {{ rent.rentPeriod.start }}</dd>
        </div>
        <div>
          <dt class="text-sm text-neutral-600 mb-4">Rezerwacja</dt>
          <dd class="mx-4 flex flex-col gap-x-8 gap-y-2">
            <span><span class="text-sm text-neutral-600">od</span> {{ rent.booking.bookedTimeSlots.from }}</span>
            <span><span class="text-sm text-neutral-600">do</span> {{ rent.booking.bookedTimeSlots.to }}</span>
          </dd>
        </div>
        <div>
          <dt class="text-sm text-neutral-600 mb-4">Zapłacono</dt>
          <dd class="mx-4">{{ rent.payment }} ZŁ</dd>
        </div>
        <div>
          <dt class="text-sm text-neutral-600 mb-4">Przejechane kilometry</dt>
          <dd class="mx-4">{{ distance }} KM</dd>
        </div>
      </dl>
    </div>
    <div class="basis-3/5 bg-light-bg text-dark-txt rounded-3xl p-4">
      <h3 class="text-xl xs:text-2xl my-4 mx-8">Lokalizacja samochodu</h3>
      <div id="map" class="h-80 w-full"></div>
    </div>
  </div>
</template>