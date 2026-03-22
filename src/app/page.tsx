import Banner from "@/components/Banner";
import getSpaces from "@/libs/getSpaces";

export default async function Home() {

  const result = await getSpaces();

  return (
    <main>
      <Banner />

      <div style={{ padding: "20px" }}>
        <h1>Coworking Spaces</h1>

        {result.data.map((item: any) => (
          <div key={item._id} style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px",
            borderRadius: "10px"
          }}>
            <h2>{item.name}</h2>
            <p>{item.address}</p>
            <p>{item.openTime} - {item.closeTime}</p>
            <p>Reservations: {item.reservations.length}</p>
          </div>
        ))}

      </div>
    </main>
  );
}