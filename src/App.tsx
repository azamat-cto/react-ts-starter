import { cn } from "./lib/utils";

function App() {
  return (
    <>
      <div className="h-[100dvh] flex items-center justify-center">
        <h1
          className={cn(
            { "text-green-500": true },
            "text-3xl font-bold underline",
          )}
        >
          Hello world!
        </h1>
      </div>
    </>
  );
}

export default App;
