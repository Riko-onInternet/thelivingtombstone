import TimelineDot from "../components/story/TimelineDot";

export default function Story() {
  return (
    <div className="mt-[100px] bg-black">
      {/* Banner */}
      <div className="w-full h-[400px] bg-[url('/img/bg/TLTChosen.jpg')] bg-cover bg-center">
        <div className="flex flex-col gap-2 items-center justify-center h-full w-full backdrop-blur-md text-center">
          <div className="relative">
            <p className="text-white relative z-10 xs:text-2xl text-lg">La storia di</p>
            <p className="text-white absolute top-0 left-0 text-border-7 xs:text-2xl text-lg">
              La storia di
            </p>
          </div>
          <div className="relative">
            <p className="text-[var(--riko-primary)] relative z-10 xs:text-7xl text-6xl uppercase impact">
              The Living Tombstone
            </p>
            <p className="absolute top-0 left-0 text-transparent xs:text-7xl text-6xl uppercase impact text-border-20">
              The Living Tombstone
            </p>
          </div>
        </div>
      </div>

      <div className="w-full px-8 lg:px-16 max-w-[1400px] mx-auto py-20">
        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
          <li>
            <div className="timeline-middle">
              <TimelineDot />
            </div>
            <div className="timeline-start md:text-end mb-10">
              <time className="font-mono text-lg">2006</time>
              <div className="text-xl font-black italic text-[var(--riko-primary)]">
                Koolfox
              </div>
              <span className="text-lg">
                Nel 2006, il musicista{" "}
                <span className="font-bold">Yoav Landau</span>, di origini
                israeliane, creò il canale{" "}
                <span className="font-bold">Koolfox</span> dove ha caricato remix
                di canzoni. Dopo che i remix ottennero diverse di migliaia di
                visualizzazioni, spostò la sua attenzione sulle varie community di
                videogiochi, creando canzoni basate su di esse.
              </span>
            </div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-middle">
              <TimelineDot />
            </div>
            <div className="timeline-end mb-10">
              <time className="font-mono text-lg">2011</time>
              <div className="text-xl font-black italic text-[var(--riko-primary)]">
                La nascita di TLT
              </div>
              <span className="text-lg">
                Il 28 agosto 2001 <span className="font-bold">Landau</span> creò{" "}
                <span className="font-bold">The Living Tombstone</span> e poi si
                trasferì negli Stati Uniti dove incontrò il cantante{" "}
                <span className="font-bold">Sam Haft</span>. Landau e Haft si sono
                scambiati le proprie canzoni prima di collaborare insieme alla
                musica, con Haft che è diventato un membro ufficiale di{" "}
                <span className="font-bold text-[var(--riko-primary)]">
                  The Living Tombstone
                </span>
              </span>
              .
            </div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-middle">
              <TimelineDot />
            </div>
            <div className="timeline-start md:text-end mb-10">
              <time className="font-mono text-lg">2014</time>
              <div className="text-xl italic font-black text-[var(--riko-primary)]">
                Five Nights at Freddy&apos;s
              </div>
              <span className="text-lg">
                Il 31 agosto 2014, venne publicato su YouTube la canzone
                <span className="font-bold">
                  Five Nights at Freddy&apos;s 1 Song
                </span>
                . In pochi mesi la canzone superò l&apos;un miglione di
                visualizzazioni riscontrando un successo incredibile facendo
                crescere tantissimo il fandom della serie. Nel 2024 ha superato i{" "}
                <span className="font-bold">359 milioni di visualizzazioni</span>.
              </span>
            </div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-middle">
              <TimelineDot />
            </div>
            <div className="timeline-end mb-10">
              <time className="font-mono text-lg">2015</time>
              <div className="text-xl font-black italic text-[var(--riko-primary)]">
                Red VS Blue
              </div>
              <span className="text-lg">
                Il 24 agosto 2015, <span className="font-bold">Landau</span> ha
                pubblicato la prima puntata della sua serie{" "}
                <span className="font-bold">Red VS Blue</span>, remixando il meme{" "}
                <span className="font-bold text-[var(--riko-primary)]">
                  Dog of Wisdom
                </span>
                . Ha pubblicato due versioni della canzone, una versione{" "}
                <a
                  href="https://youtu.be/2LOmFBBq4T0?si=7ZZBZiuav3nXGEq_"
                  className="underline text-[var(--riko-tlt-blue)] font-bold"
                >
                  Blue
                </a>
                , che è la variazione &quot;Casual&quot; della canzone, e la
                versione{" "}
                <a
                  href="https://youtu.be/sqJDbe9A36c?si=lIq4pvFO_Xdw6XBd"
                  className="underline text-[var(--riko-tlt-red)] font-bold"
                >
                  Red
                </a>
                , la variazione più &quot;Hardcore&quot; della canzone. Però
                questa serie non durò molto.
              </span>
            </div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-middle">
              <TimelineDot />
            </div>
            <div className="timeline-start md:text-end mb-10">
              <time className="font-mono text-lg">2015 - 2016</time>
              <div className="text-xl italic font-black text-[var(--riko-primary)]">
                Il declino
              </div>
              <span className="text-lg">
                Tra il 2015 e il 2016, <span className="font-bold">Landau</span> e{" "}
                <span className="font-bold">Haft</span> pubblicarono tante canzoni
                e remix tra cui le pi&ugrave; importanti sono{" "}
                <span className="font-bold">
                  Five Nights at Freddy&apos;s 4 Song - I Got No Time
                </span>
                ,<span className="font-bold">It&apos;s Raining Man Remix</span>,
                <span className="font-bold">
                  Five Nights at Freddy&apos;s Sister Location Song - I Can&apos;t
                  Fix You
                </span>
                , e <span className="font-bold">Jump up, Super Star!</span>. Però
                queste canzoni non fecero il successo sperato, solo col passare
                del tempo divvenero famose.
              </span>
            </div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-middle">
              <TimelineDot />
            </div>
            <div className="timeline-end mb-10">
              <time className="font-mono text-lg">2017</time>
              <div className="text-xl italic font-black text-[var(--riko-primary)]">
                My Ordinary Life
              </div>
              <span className="text-lg">
                Il 27 novembre 2017, <span className="font-bold">Landau</span> e{" "}
                <span className="font-bold">Haft</span> pubblicarono la canzone{" "}
                <span className="font-bold">My Ordinary Life</span>. La canzone
                divenne virale e superò l&apos;un milione di visualizzazioni in
                meno di un mese, facendo &quot;rinascre&quot; The Living
                Tombstone.
              </span>
            </div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-middle">
              <TimelineDot />
            </div>
            <div className="timeline-start md:text-end mb-10">
              <time className="font-mono text-lg">2020</time>
              <div className="text-xl italic font-black text-[var(--riko-primary)]">
                zero_one
              </div>
              <span className="text-lg">
                Nel 2019, The Living Tombstone firmò con Warner Music Group.
                Landau ha spiegato che si erano presi una pausa per pubblicare un
                album, intitolato{" "}
                <span className="font-bold text-[var(--riko-primary)]">
                  zero_one
                </span>
                , e successivamente hanno pubblicato il primo singolo
                dall&apos;album, <span className="font-bold">Drunk</span>,
                l&apos;11 giugno 2020. Il loro secondo singolo, e
                l&apos;annuncio formale dell&apos;album, è arrivato sotto forma di{" "}
                <span className="font-bold">Sunburn</span>.
              </span>
            </div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-middle">
              <TimelineDot />
            </div>
            <div className="timeline-end mb-10">
              <time className="font-mono text-lg">2021</time>
              <div className="text-xl italic font-black text-[var(--riko-primary)]">
                In Sound Mind
              </div>
              <span className="text-lg">
                Nel 2021 The Living Tombstone ha composto tutte le canzoni di un
                gioco horror indipentente chiamato{" "}
                <span className="font-bold">In Sound Mind</span>.
              </span>
            </div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-middle">
              <TimelineDot />
            </div>
            <div className="timeline-start md:text-end mb-10">
              <time className="font-mono text-lg">2024</time>
              <div className="text-xl italic font-black text-[var(--riko-primary)]">
                &quot;E ora?&quot; &quot;Rust!&quot;
              </div>
              <span className="text-lg">
                Oggi The Living Tombstone ha accumulato 7 milioni di iscritti su
                YouTube e la loro musica ha raggiunto oltre 45 miliardi di stream
                su tutte le piattaforme. Landau e Haft hanno intenzione di
                pubblicare un secondo album chiamato Rust, la data prevista è per
                il 2024.
              </span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
