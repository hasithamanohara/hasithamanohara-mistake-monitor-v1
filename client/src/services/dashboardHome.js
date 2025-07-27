const DashboardHome = () => {
      return (
            <div
                  className="
        w-full min-h-screen
        bg-gradient-to-br from-purple-500 via-pink-600 to-red-500
        flex flex-col justify-center items-center
        text-white
        px-6
      "
                  style={{ minHeight: 'calc(100vh - 48px)' }}
            >
                  <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg">
                        Welcome to the Dashboard!
                  </h1>
                  <p className="text-2xl max-w-xl text-center drop-shadow-md">
                        Please select an option from the sidebar to get started.
                  </p>
            </div>
      );
};

export default DashboardHome;
