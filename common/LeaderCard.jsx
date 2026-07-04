import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";

export default function LeaderCard({ leader, reversed }) {
  return (
    <div
      className={`flex flex-col ${
        reversed ? "md:flex-row-reverse" : "md:flex-row"
      } gap-8 md:gap-14 items-start`}
    >
      {/* image section */}

      <div className="flex flex-col items-center gap-4 w-full md:w-64 shrink-0">
        <div className="relative w-48 h-56 md:w-56 md:h-64 rounded-sm overflow-hidden border-4 border-surface shadow-xl ring-1 ring-accent/20">
          <Image
            src={leader.image}
            alt={leader.name}
            fill
            className="object-cover object-top"
          />
        </div>

        <div className="text-center">
          <p className="font-bold">{leader.name}</p>
          <p className="text-primary text-xs uppercase">{leader.role}</p>
        </div>
      </div>

      {/* message */}

      <div className="flex-1">
        <div className="flex items-center gap-3 mb-4">
          <FaQuoteLeft className="text-accent/50 text-3xl" />
          <h3 className="text-primary text-xl font-bold">{leader.roleLabel}</h3>
        </div>

        {leader.message.map((para, i) => (
          <p key={i} className="mb-3 text-gray-600">
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}
