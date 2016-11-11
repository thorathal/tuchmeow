/**
 * @author Bjarke Carlsen
 */

export interface ChannelSnippet{
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