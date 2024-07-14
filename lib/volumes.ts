type Item = {
    kind: string,
    id: string,
    etag: string,
    selfLink: string,
    volumeInfo: VolumeInfo
}

type VolumeInfo = {
    title: string,
    authors: string[],
    categories: string[],
}

export type VolumesResponse = {
    items: [Item]
}

export const searchVolumes = async (search: string) => {
    const books = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}`);
    return await books.json() as VolumesResponse;
}