export interface Video_Response{
    items: [{
        id: {
            videoId: string;
        }
        snippet: {
            title: string;
            thumbnails: {
                medium: {
                    url: URL;
                }
            }
        }
    }];
}