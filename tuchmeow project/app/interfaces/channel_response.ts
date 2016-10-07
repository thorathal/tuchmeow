export interface Channel_Response{
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