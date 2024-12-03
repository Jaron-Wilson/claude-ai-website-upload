import React, { useEffect, useState } from 'react';
import { 
    Container, 
    Box, 
    Typography, 
    Card, 
    CardContent, 
    CardActions,
    Button,
    Grid
} from '@mui/material';
import { storage } from '../services/storage';
import { LinkItem } from '../types';

export const Home: React.FC = () => {
    const [items, setItems] = useState<LinkItem[]>([]);

    useEffect(() => {
        const data = storage.getData();
        setItems(data.items);
    }, []);

    const embedVideo = (url: string) => {
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            const videoId = url.includes('youtube.com') 
                ? url.split('v=')[1]
                : url.split('youtu.be/')[1];
            return `https://www.youtube.com/embed/${videoId}`;
        }
        return url;
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Featured Links
                </Typography>

                <Grid container spacing={3}>
                    {items.map((item) => (
                        <Grid item xs={12} md={6} key={item.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        {item.title}
                                    </Typography>
                                    
                                    {item.videoUrl && (
                                        <Box sx={{ my: 2, position: 'relative', paddingTop: '56.25%' }}>
                                            <iframe
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                }}
                                                src={embedVideo(item.videoUrl)}
                                                title={item.title}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </Box>
                                    )}
                                </CardContent>
                                
                                {item.amazonUrl && (
                                    <CardActions>
                                        <Button 
                                            size="small" 
                                            color="primary" 
                                            href={item.amazonUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            View on Amazon
                                        </Button>
                                    </CardActions>
                                )}
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};