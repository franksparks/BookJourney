"use client"

type PageProps = {
    params: {
        googleBooksId: string;

    }
};

export default async function Page( {params}: PageProps) {

    const {googleBooksId} = params;
    console.log('HOLAAAA')
    console.log(googleBooksId);

    return <div>{`I'll be the page for ${googleBooksId}`}</div>;
}
