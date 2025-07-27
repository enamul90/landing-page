
import {dashboardCards} from "@/data/mainData"
export default function Dashboard() {

  return (
    <>
      {/* Main Content */}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 lg:gap-4 px-3 mt-5">
        {dashboardCards.map((card, index) => (
            <div
                key={index}
                className="bg-Shave p-4 rounded shadow-lg transition hover:shadow-xl hover:scale-[1.02]
                duration-300 flex justify-between items-center border-s-2 border-primary cursor-pointer
                "
            >
              <div>
                <h3 className="text-Text-75">{card.title}</h3>
                <p className="text-3xl text-Text-100">{card.value}</p>
              </div>
              {card.icon}

            </div>
        ))}
      </div>

    </>
  );
}
