<script setup lang="ts">
  import CheckedListItem from '@/components/ui-common/CheckedListItem.vue';
</script>

<template>
  <div>
    <h1 class="text-5xl text-center">O nas</h1>
    <section class="flex justify-around my-30">
        <div class="text-center">
          <h3 class="text-7xl text-dominant-primary font-bold">20k+</h3>
          <h4>Zadowoleni klienci</h4>
        </div>
        <div class="text-center">
          <h3 class="text-7xl text-dominant-primary font-bold">6+</h3>
          <h4>Liczba samochodów</h4>
        </div>
        <div class="text-center">
          <h3 class="text-7xl text-dominant-primary font-bold">5+</h3>
          <h4>Lata doświadczenia</h4>
        </div>
    </section>
    <section class="max-w-4xl mx-auto my-30">
      <h2 class="text-5xl">Odblokuj niezapomniane wspomnienia w podróży</h2>
      <h3 class="my-10">
        Planujesz wakacje, podróż służbową lub spontaniczny wypad za miasto? Z nami masz pełną swobodę wyboru i komfort jazdy! Oferujemy szeroką gamę samochodów, dopasowanych do Twoich potrzeb.
      </h3>
      <ul class="grid grid-cols-2 gap-10">
        <CheckedListItem>
            Szeroki wybór pojazdów - Od kompaktowych aut miejskich po luksusowe SUV-y i przestronne vany.
        </CheckedListItem>
        <CheckedListItem>
            Elastyczność i wygoda - Możliwość wynajmu krótkoterminowego i długoterminowego na atrakcyjnych warunkach.
        </CheckedListItem>
        <CheckedListItem>
            Bezproblemowy wynajem - Prosty proces rezerwacji, przejrzyste warunki i minimum formalności.
        </CheckedListItem>
        <CheckedListItem>
            Całodobowe wsparcie - Jesteśmy do Twojej dyspozycji 24/7, abyś mógł cieszyć się bezstresową podróżą.
        </CheckedListItem>
      </ul>
    </section>
    <section class="mx-18 my-15 grid grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] gap-5">
      <h2 class="text-5xl font-bold row-span-2">Gdzie każda jazda samochodem jest wyjątkowa</h2>
      <div>
        <h3 class="text-3xl mb-4">Różnorodne Marki</h3>
        <p>
          Marki różnorodne - Oferujemy szeroki wybór samochodów różnych marek i klas. Bez względu na to, czy potrzebujesz ekonomicznego auta na miasto, luksusowego sedana czy przestronnego SUV-a - u nas znajdziesz idealny pojazd dla siebie.
        </p>
      </div>
      <div>
        <h3 class="text-3xl mb-4">Maksymalna Wolność</h3>
        <p>
          Podróżuj bez ograniczeń! Nasze samochody są gotowe do jazdy zarówno po mieście, jak i na dłuższe trasy. Ty decydujesz, dokąd zmierzasz.
        </p>
      </div>
      <div>
        <h3 class="text-3xl mb-4">Niesamowite Wsparcie</h3>
        <p>
          Nasz zespół jest do Twojej dyspozycji 24/7. W razie jakichkolwiek pytań lub problemów zapewniamy szybką i profesjonalną pomoc.
        </p>
      </div>
      <div>
        <h3 class="text-3xl mb-4">Elastyczność W Podróży</h3>
        <p>
          Wynajmij auto na dzień, tydzień lub nawet miesiąc - dostosujemy ofertę do Twoich potrzeb. Oferujemy atrakcyjne warunki wynajmu i przejrzyste zasady.
        </p>
      </div>
    </section>
  </div>
</template>
