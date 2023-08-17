export default function Test() {
  return (
    <div className="grid h-screen w-screen place-items-center">
      <div className="">
        <h1 className="text-xl">Test page</h1>

        <button
          className="mt-lg border border-blue-400 px-2 py-1"
          onClick={() => void postSheet({ Title: "77777", Content: "GOOTTTT" })}
        >
          Post
        </button>
      </div>
      {/* <Form /> */}
    </div>
  );
}

const postSheet = async (data: { Title: string; Content: string }) => {
  await fetch("/api/sheets", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
