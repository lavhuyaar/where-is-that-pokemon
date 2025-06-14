const Loading = () => {
  return (
    <>
      <main className="w-full h-screen flex flex-col items-center justify-center gap-3 !p-3">
        <div className="loader"></div>
        <h4 className="font-semibold text-3xl text-center">Loading... This might take a few minutes!</h4>
      </main>
    </>
  );
};
export default Loading;
