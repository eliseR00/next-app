export const metaData = {
    title: "About Page",
    description: "This is the about page of the app"
};

export default function About() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-10">
            <h1 className="text-3xl mb-4">About Page</h1>
            <p className="max-w-xl text-center text-gray-600">This is an about page. This app is designed to help me complete labs and learn how to use next.js</p>
        </div>
    );
}