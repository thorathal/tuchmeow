/**
 * @author Bjarke Carlsen
 */

export interface VideoSnippet{
    items: [{
        id: {
            videoId: string
        },
        snippet: {
            title: string,
            thumbnails: {
               medium: {
                    url: string
                }
            }
        }
    }];
}