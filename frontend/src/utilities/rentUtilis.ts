import { Rent } from "./models/rentModel";
import { Car } from "./models/carModel";
import { User } from "./models/userModel";

const rents: Rent[] = [
  {
    _id: 'rentID_1234',
    car: {
      _id: "67f51cc3e2671ffdd1a93630",
      make: "Toyota",
      model: "Camry",
      capacity: 5,
      year: 2000,
      color: "Czerwony",
      bodyType: "Sedan",
      gearboxType: "Manualna",
      mileage: 549319,
      fuelType: "Benzyna",
      hourlyPrice: 43,
      imageUrl: "https://media.gettyimages.com/id/672151647/photo/silver-car-speeding-on-bridge.jpg?s=2048x2048&w=gi&k=20&c=C4QgEYzOBXL7EOs1T0lHCxiQjfpBMVtFV572oLCbS_E='",
      description: "Jesteś zainteresowany naszą ofertą? Myślę, że czerwona Toyota Camry to idealny samochód dla Ciebie. W naszej ofercie wynajmu znajdziesz pojazdy, które są bezpieczne i komfortowe. Dlatego staramy się, aby samochody znajdujące się w naszej ofercie były jak najmłodsze - dowodem na to jest oferta tego auta, gdzie rok produkcji to 2000. Model ten wyróżnia się manualną skrzynią biegów oraz niezawodnym napędem benzynowym, zapewniającym doskonałą dynamikę jazdy i komfort. Dzięki temu doskonale sprawdza się zarówno w dalekich podróżach, jak i w warunkach miejskich. Koszt wynajmu to zaledwie 43 zł za godzinę, co czyni go atrakcyjną opcją dla osób poszukujących niezawodnego środka transportu. Jeśli Twój pojazd ma jakieś życie na drodze lub nawet tylko jedno zatrzymanie, skontaktuj się z nami pod adresem service@aalcetrovia.co klienta.",
      bookedTimeSlots: [],
      isAvailable: true,
      cluster: 1,
    },
    user: {
      _id: "67f686c51f7b81d4fbd51474",
      username: "milosz123",
      email: "gajda.milosz@gmail.com",
      isAdmin: false,
      firstName: "Milosz",
      surname: "Gajda",
      phoneNumber: "1231231122",
      address: "no addres",
      dateOfBirth: "1986-03-02T00:00:00.000Z",
      gender: "Mężczyzna",
      favorites: [],
      avatar: "some image url",
      recommended_cluster: 4
    },
    booking: {
      _id: "680a423613c1350105f35386",
      bookedTimeSlots: {from: "2025-03-01", to: "2025-04-01"},
      totalHours: 744,
      totalPrice: 68448,
      transactionId: "is it work at all ?? no such value in response",
      driver: true,
      isPaid: true
    },
    rentPeriod: { start: "2025-03-02", end: undefined },
    carMileage: { atStart: 549319, atEnd: undefined },
    payment: 68448,
    status: 'active'
  },
  {
    _id: 'rentID_2345',
    car: {
      _id: "67f51cc3e2671ffdd1a93682",
      make: "Fiat",
      model: "Punto",
      capacity: 7,
      year: 2019,
      color: "Czerwony",
      bodyType: "Sedan",
      gearboxType: "Manualna",
      mileage: 45125,
      fuelType: "Benzyna",
      hourlyPrice: 118,
      imageUrl: "https://media.gettyimages.com/id/672151647/photo/silver-car-speeding-on-bridge.jpg?s=2048x2048&w=gi&k=20&c=C4QgEYzOBXL7EOs1T0lHCxiQjfpBMVtFV572oLCbS_E='",
      description: "Jesteś zainteresowany naszą ofertą? Myślę, że czerwony Fiat Punto to idealny samochód dla Ciebie. W naszej ofercie wynajmu znajdziesz pojazdy, które są bezpieczne i komfortowe. Dlatego dokładamy wszelkich starań, aby samochody znajdujące się w naszej ofercie były jak najmłodsze - oferta tego auta, gdzie rokiem produkcji jest rok 2019, jest tego dowodem. Model ten wyróżnia się manualną skrzynią biegów oraz niezawodnym napędem benzynowym, zapewniającym doskonałą dynamikę jazdy i komfort. Dzięki temu doskonale sprawdza się zarówno w dalekich podróżach, jak i w warunkach miejskich. Koszt wynajmu to zaledwie 118 zł za godzinę, co czyni go atrakcyjną opcją dla osób poszukujących niezawodnego środka transportu. Czerwony Fiat Punso składa się z 7 różnych modeli ze wszystkimi trzema standardowymi opcjami strojenia, które zostały wcześniej omówione: lub Srebrny (kolor podobny do normalnego czarnego), Niebieski (), Złoty, Platynowy - biały, żółty, zielony i różowy; Koła 5 x 4L z 6 przednimi siedzeniami oraz dwoma silnikami głównymi, takimi jak wycięcia po każdej stronie, w tym wałki wspomagania kierownicy/kontroli momentu obrotowego silnika, a także jedno nowe opcjonalne sprzęgło zamontowane pod czterema tarczami kół przymocowanymi z części nadwozia tylnego zawieszenia do innych specjalistycznych elementów, takich jak system wspomagania trakcji itp.",
      bookedTimeSlots: [],
      isAvailable: true,
      cluster: 1,
    },
    user: {
      _id: "67f686c51f7b81d4fbd51474",
      username: "milosz123",
      email: "gajda.milosz@gmail.com",
      isAdmin: false,
      firstName: "Milosz",
      surname: "Gajda",
      phoneNumber: "1231231122",
      address: "no addres",
      dateOfBirth: "1986-03-02T00:00:00.000Z",
      gender: "Mężczyzna",
      favorites: [],
      avatar: "some image url",
      recommended_cluster: 4
    },
    booking: {
      _id: "680b13820e43d6a980d36026",
      bookedTimeSlots: {from: "2025-05-05", to: "2025-05-07"},
      totalHours: 48,
      totalPrice: 5664,
      transactionId: "is it work at all ?? no such value in response",
      driver: true,
      isPaid: true
    },
    rentPeriod: { start: "2025-05-05", end: "2025-05-07" },
    carMileage: { atStart: 43213, atEnd: 45125 },
    payment: 5664,
    status: 'complete'
  },
  {
    _id: 'rentID_3456',
    car: {
      _id: "67f51cc3e2671ffdd1a93630",
      make: "Fiat",
      model: "500",
      capacity: 5,
      year: 2017,
      color: "Czerwony",
      bodyType: "Coupe",
      gearboxType: "Manualna",
      mileage: 163019,
      fuelType: "Benzyna",
      hourlyPrice: 96,
      imageUrl: "https://media.gettyimages.com/id/1379611333/photo/generic-modern-car-in-front-of-concrete-wall.jpg?s=2048x2048&w=gi&k=20&c=Uec-TdCFhwaSZjZvAKWdUVteClGHWHs03DmICrhk_dQ=",
      description: "Jesteś zainteresowany naszą ofertą? Myślę, że czerwony Fiat Punto to idealny samochód dla Ciebie. W naszej ofercie wynajmu znajdziesz pojazdy, które są bezpieczne i komfortowe. Dlatego dokładamy wszelkich starań, aby samochody znajdujące się w naszej ofercie były jak najmłodsze - oferta tego auta, gdzie rokiem produkcji jest rok 2019, jest tego dowodem. Model ten wyróżnia się manualną skrzynią biegów oraz niezawodnym napędem benzynowym, zapewniającym doskonałą dynamikę jazdy i komfort. Dzięki temu doskonale sprawdza się zarówno w dalekich podróżach, jak i w warunkach miejskich. Koszt wynajmu to zaledwie 118 zł za godzinę, co czyni go atrakcyjną opcją dla osób poszukujących niezawodnego środka transportu. Czerwony Fiat Punso składa się z 7 różnych modeli ze wszystkimi trzema standardowymi opcjami strojenia, które zostały wcześniej omówione: lub Srebrny (kolor podobny do normalnego czarnego), Niebieski (), Złoty, Platynowy - biały, żółty, zielony i różowy; Koła 5 x 4L z 6 przednimi siedzeniami oraz dwoma silnikami głównymi, takimi jak wycięcia po każdej stronie, w tym wałki wspomagania kierownicy/kontroli momentu obrotowego silnika, a także jedno nowe opcjonalne sprzęgło zamontowane pod czterema tarczami kół przymocowanymi z części nadwozia tylnego zawieszenia do innych specjalistycznych elementów, takich jak system wspomagania trakcji itp.",
      bookedTimeSlots: [],
      isAvailable: true,
      cluster: 1,
    },
    user: {
      _id: "67f686c51f7b81d4fbd51474",
      username: "milosz123",
      email: "gajda.milosz@gmail.com",
      isAdmin: false,
      firstName: "Milosz",
      surname: "Gajda",
      phoneNumber: "1231231122",
      address: "no addres",
      dateOfBirth: "1986-03-02T00:00:00.000Z",
      gender: "Mężczyzna",
      favorites: [],
      avatar: "some image url",
      recommended_cluster: 4
    },
    booking: {
      _id: "680b52840e43d6a980d3605d",
      bookedTimeSlots: {from: "2025-06-01", to: "2025-06-03"},
      totalHours: 48,
      totalPrice: 4608,
      transactionId: "is it work at all ?? no such value in response",
      driver: true,
      isPaid: true
    },
    rentPeriod: { start: "2025-06-01", end: "2025-06-03" },
    carMileage: { atStart: 161319, atEnd: 163019 },
    payment: 4608,
    status: 'complete'
  }
]

export function getAllRents (): Rent[] {
  return rents;
}

export function getActiveRent (): Rent|undefined {
  return rents.find(el => el.status === 'active');
}