# PingPongPortal

## Designprocess

### Användarstudie
Gå in på google-dokumentet: [Användarstudien](https://docs.google.com/document/d/1yHuAJPSjkmDCSJxGQ94_LqBCCZtc_uvTdp4pVg1VB2A/edit?tab=t.0)<br>
för att se intervjuer och sammanställning för 5 personer.

### Personas, user-stories och LoFi/HiFi skisser

Gi in på figma filen: [FigmaDesign](https://www.figma.com/design/sY6qAFOsr3OPufHvHZu4xK/Untitled?t=dW3Nb0T7a9LIhXco-0)<br>
För att se personas, user-stories och skisser/prototyper på hemsidan.

## Testa Endpoints i insomnia
Bas i alla: http://localhost:3000

1. Facility Endpoints
Bas: /facilities

GET /
Hämta en lista över alla tillgängliga anläggningar.
Ingen token eller body krävs.

GET /:id
Hämta detaljer om en anläggning baserat på id. Skriv in ett id från någon av föregående förfrågan i urlen istället för :id.

GET /:id/availableDates/:date/timeslots
Hämta bokningstider för ett visst datum. skriv in ett id och ett date från föregående förfrågan i urlen :id och :date.

GET /search hämtar alla anläggningar som stämmer överäns med sökresultatet. Sätt in ?q=<sökord> efter search i urlen

2. Auth Endpoints
Bas: /auth

POST /register
Registrera en ny användare.
JSON Body
{
	"username": "name",
	"email": "name@name.com",
	"password": "password"
}

POST /login
Loggar in en ny användare.
JSON Body
{
	"email": "name@name.com",
	"password": "password"
}

3. Booking Endpoints
Bas: /bookings

GET / Hämtar all bokningar som en inloggad anvämdare har. Skriv in idt du får från login i Body och token du får i Auth/Bearer Token/Token.
JSON Body:
{
	"userId": "id"
}

POST /create Skapar en bokning för en innloggad användare. Skriv in något av de facilityId du får från föregående istället för id och token du får i Auth/Bearer Token/Token.
JSON Body:
{
  "facilityId": "id",
  "date": "xxxx-xx-xx",
  "time": "xx:xx-xx:xx"
}

DELETE /delete/:id Raderar en bokning för en innloggad användare. Skriv in token du får i login i Auth/Bearer Token/Token och något av bookingId du får från GET / i urlen istället för :id.

4. Admin Endpoints
Bas: /admin

GET / Hämtar alla användare för en inloggad admin. Skriv in token du får i login i Auth/Bearer Token/Token

POST /create Skapar en användare. Skriv in token du får i login i Auth/Bearer Token/Token. Ta data från föregående endpoint och skicka in i Body.
JSON Body
{
	"username": "name",
	"email": "name@name.com",
	"password": "password"
}

PUT /update/:id Uppdatera en viss användare för en inloggad admin. Skriv in token du får i login i Auth/Bearer Token/Token. Skriv in något av attributen i Body och skriv in något av userId du får från GET / istället för :id i urlen.
JSON Body
{
	"username": "name",
	"email": "name@name.com",
	"password": "password"
}

DELETE /delete/:id Raderar en viss användare för en inloggad admin. Skriv in token du får i login i Auth/Bearer Token/Token. Skriv in något av userId du får från GET / istället för :id i urlen.