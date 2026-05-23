import Image from "next/image";

const MAPS_URL =
  "https://maps.app.goo.gl/o4jFZYrh3yLnfybB7";

export default function VenueSection() {
  return (
    <section className="bg-white flex flex-col items-center justify-start pt-8 pb-12 px-4 sm:px-8">
      <div className="text-center mb-6">
        <p className="font-body text-xs sm:text-sm tracking-[0.15em] uppercase text-primary">
          The celebration will take place at
        </p>
      </div>

      <div className="w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-[0_10px_30px_-12px_rgba(92,32,24,0.25)] bg-secondary">
        <div className="relative w-full aspect-4/3">
          <Image
            src="/place-new-one.jpg"
            alt="Al Loaloaa Village Halls"
            fill
            sizes="(max-width: 640px) 100vw, 28rem"
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col items-center text-center px-6 py-7 sm:py-8">
          <h2 className="font-script text-4xl sm:text-5xl text-primary leading-none">
            Al Loaloaa Village
          </h2>
          <p className="mt-3 font-display text-base sm:text-lg text-primary/90">
            Faiyum, Egypt
          </p>

          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 bg-primary text-secondary font-script text-xl sm:text-2xl px-8 sm:px-10 py-3 sm:py-3.5 rounded-full shadow-md active:scale-[0.98] transition-transform w-full max-w-xs"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path
                fillRule="evenodd"
                d="M11.54 22.351a.75.75 0 0 0 .92 0c.282-.217 8.04-6.27 8.04-13.601a8.5 8.5 0 1 0-17 0c0 7.331 7.758 13.384 8.04 13.601ZM12 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z"
                clipRule="evenodd"
              />
            </svg>
            Open in Google Maps
          </a>
        </div>
      </div>

      <div className="text-center mt-10">
        <p className="font-display text-2xl md:text-3xl tracking-wide text-primary">
          August 2, 2026
        </p>
      </div>

      <div className="text-center mt-4">
        <p className="font-script text-3xl md:text-4xl text-primary">
          Reception to Follow
        </p>
      </div>
    </section>
  );
}
