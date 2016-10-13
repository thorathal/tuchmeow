export interface Channel_Snippet{
    items: [{
        id: string;
        snippet: {
            title: string;
            description: string;
            thumbnails: {
                medium: {
                    url: URL;
                }
            }
        }
    }];
}