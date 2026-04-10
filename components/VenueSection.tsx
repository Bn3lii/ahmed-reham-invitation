import Image from "next/image";

export default function VenueSection() {
  return (
    <section className="bg-white flex flex-col items-center justify-start pt-8 pb-12 px-8">
      <div className="text-center mb-4">
        <p className="font-body text-sm tracking-[0.15em] uppercase text-primary">
          The celebration will take place at
        </p>
      </div>
      <div className="max-w-2xl w-full mb-8">
        {/* We use standard img for missing assets so it doesn't hard-crash Next.js Image if not found */}
        <Image
          src="/place-new.jpg" 
          alt="Venue Illustration" 
          className="w-full h-auto text-primary text-center italic text-sm"
          width={500}
          height={500}
        />
      </div>
      <div className="text-center mb-4">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-wide leading-tight text-primary">
          Al Loaloaa Village Halls - Fayoum
        </h2>
      </div>
      <div className="text-center mb-8">
        <p className="font-body text-xs tracking-[0.2em] uppercase text-primary">
          Qarun Lake - Before Helnan Auberge Hotel
        </p>
        <p className="font-body text-xs tracking-[0.2em] uppercase text-primary">
          Faiyum, Egypt
        </p>
      </div>
      <div className="text-center mb-10">
        <p className="font-display text-2xl md:text-3xl tracking-wide text-primary">
          August 2, 2026
        </p>
      </div>
      <div className="text-center">
        <p className="font-script text-3xl md:text-4xl text-primary">
          Reception to Follow
        </p>
      </div>
    </section>
  );
}
