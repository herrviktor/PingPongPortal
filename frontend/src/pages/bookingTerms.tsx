import SectionTerms from "../components/sectionTerms";

const BookingTerms: React.FC = () => {
    return (
        <div className="gFlexS flex-col px-5 pb-5">
            <h2 className="main-h2">Bokningsvilkor</h2>
            <div className="flex flex-wrap justify-evenly">
                <div className="w-xs sm:w-sm md:w-md lg:w-lg xl:w-2xl">
                    <SectionTerms title="1. Allmänt">
                        <p>
                            Dessa bokningsvillkor gäller för all bokning av bordtennispass 
                            genom vår webbplats. Genom att slutföra en bokning godkänner du 
                            villkoren nedan.
                        </p>
                    </SectionTerms>
                    <SectionTerms
                        title="2. Bokning"
                        listItems={[
                        "Bokning sker via hemsidan och är giltig först när en bekräftelse poppat upp på sidan.",
                        "Du ansvarar själv för att bokningen du gjort vid bokning är korrekt.",
                        ]}
                    />
                    <SectionTerms
                        title="3. Avbokning och ombokning"
                        listItems={[
                        "Avbokning kan ske upp till 12 timmar innan bokad tid utan kostnad.",
                        "Vid avbokning senare än 12 timmar innan debiteras hela beloppet.",
                        ]}
                    />
                    <SectionTerms
                        title="4. Ankomst och användning"
                        listItems={[
                        "Vänligen kom i tid till din bokning. Ej utnyttjad tid återbetalas inte.",
                        "Endast bokade personer får använda bordet under den reserverade tiden.",
                        "Racketar och bollar ingår inte i bokningen utan tas med själv om inget annat anges."
                        ]}
                    />
                </div>
                <div className="w-xs sm:w-sm md:w-md lg:w-lg xl:w-2xl">
                    <SectionTerms
                        title="5. Ansvar"
                        listItems={[
                        "Hallen ansvarar inte för personliga tillhörigheter under din vistelse.",
                        "Du ansvarar för att vårda utrustning och lokal. Vid skada orsakad av oaktsamhet kan du bli ersättningsskyldig.",
                        ]}
                    />
                    <SectionTerms
                        title="6. Betalning"
                        listItems={[
                        "Betalning sker på plats i samband med bokning.",
                        "Vid utebliven betalning är bokningen ogiltig.",
                        ]}
                    />
                    <SectionTerms
                        title="7. Övrigt"
                        listItems={[
                        "Hallen förbehåller sig rätten att ändra eller avbryta bokningar vid särskilda händelser, till exempel tekniska problem eller underhåll. I ett sådant fall återbetalas hela beloppet.",
                        "Eventuella tvister hanteras enligt svensk lag.",
                        ]}
                    />
                </div>
            </div>
        </div>
    )
}

export default BookingTerms