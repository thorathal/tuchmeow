export interface Video_Data{
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