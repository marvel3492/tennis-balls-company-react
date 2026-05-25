/**
 * @param {{error: Error | ErrorDataType}} props
 */
export default function ErrorPage({error}) {
    return (
        <>
            <h1>{error.name}</h1>
            <h2>{error.message}</h2>
            <pre>{error.stack}</pre>
        </>
    );
}