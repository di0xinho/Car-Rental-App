<template>
  <div class="flex flex-col lg:flex-row gap-8">
    <div class="basis-3xs shrink-0 grow min-h-80 bg-light-bg text-dark-txt rounded-3xl p-8">
      <div>
        <h3 class="text-2xl my-4 mx-8">Dystans</h3>
        <h4>od 01.01.2025 do 05.01.2025</h4>
      </div>
      <p>
        Dystans ostatniej trasy i dystans od początku wypożyczenia auta. Dla każdego dystansu podane orientacyjne zużycie paliwa.
      </p>
    </div>
    <div class="basis-3/5 min-h-80 bg-light-bg text-dark-txt rounded-3xl p-8">
      <h3 class="text-2xl my-4 mx-8">Ostatnia trasa</h3>
      <p>
        Można spróbować zaimplementować
        <a href="https://developers.google.com/maps/documentation/javascript/examples/polyline-simple#maps_polyline_simple-javascript">
          GooleMaps JavaScript API
        </a>
        i wyświetlić ostatnią trasę (od włączenia auta do wyłączenia, tras podczas okresu wynajmu może być kilka)
      </p>
    </div>
  </div>
</template>