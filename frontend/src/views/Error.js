export default function Error({error}) {
    return (
        <>
            <h1>Error</h1>
            <h2>{error.message ? error.message : error.code}</h2>
        </>
    );
}