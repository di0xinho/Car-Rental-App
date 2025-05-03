<template>
  <div class="banner flex justify-around px-4 py-8 sm:p-8 lg:p-18 mt-35 sm:mt-30 lg:mt-45 md:gap-10 lg:gap-16">
    <div class="relative basis-25 md:basis-50 lg:basis-64 md:shrink-0">
      <img 
        src="/images/news-banner/mobile_car.webp"
        alt="mobile phone screen"
        class="absolute rotate-15 md:rotate-none min-w-50 lg:min-w-64 bottom-0 -left-6 md:left-0"
      > 
    </div>
    <div class="relative z-20 p-2 rounded-l-xl basis-80 grow min-w-[280px] max-w-150 h-60 sm:h-65 lg:h-70 flex flex-col justify-between bg-dominant-primary/80">
      <header>
        <h4 class="text-2xl sm:text-3xl lg:text-5xl">
          Mercedes CLS
        </h4>
        <h5 class="text-lg sm:text-xl lg:text-2xl">
          Nowy samochód w naszej ofercie
        </h5>
      </header>
      <p class="text-sm sm:text-base">
        Mercedes z modelem CLS zapoczątkował modę na auta w stylu coupe, które łączyły wymiar estetyczny z praktycznym. W oferowanym przez nas CLS&nbsp;63&nbsp;AMG&nbsp;S ...
      </p>
      <RouterLink to="https://play.google.com" class="btn inline-block text-dark-txt bg-dominant-secondary text-sm sm:text-base">
        Zobacz szczegóły
      </RouterLink>
    </div>
  </div>
</template>