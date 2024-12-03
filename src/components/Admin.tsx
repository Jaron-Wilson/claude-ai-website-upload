import React, { useState, useEffect } from 'react';
import { 
    Container, 
    TextField, 
    Button, 
    Box, 
    Paper, 
    Typography,
    List,
    ListItem,
    IconButton
} from '@mui/material';
import { storage } from '../services/storage';
import { LinkItem } from '../types';

export const Admin: React.FC = () => {
    const [items, setItems] = useState<LinkItem[]>([]);
    const [title, setTitle] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [amazonUrl, setAmazonUrl] = useState('');

    useEffect(() => {
        const data = storage.getData();
        setItems(data.items);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newItem = storage.addItem({ title, videoUrl, amazonUrl });
        setItems(prev => [...prev, newItem]);
        setTitle('');
        setVideoUrl('');
        setAmazonUrl('');
    };

    const handleDelete = (id: string) => {
        storage.deleteItem(id);
        setItems(prev => prev.filter(item => item.id !== id));
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Admin Panel
                </Typography>

                <Paper sx={{ p: 2, mb: 4 }}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Video URL"
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            label="Amazon Associates URL"
                            value={amazonUrl}
                            onChange={(e) => setAmazonUrl(e.target.value)}
                            margin="normal"
                        />
                        <Button 
                            type="submit" 
                            variant="contained" 
                            color="primary"
                            sx={{ mt: 2 }}
                        >
                            Add Item
                        </Button>
                    </form>
                </Paper>

                <Typography variant="h5" component="h2" gutterBottom>
                    Existing Items
                </Typography>

                <List>
                    {items.map((item) => (
                        <ListItem 
                            key={item.id}
                            sx={{ 
                                bgcolor: 'background.paper',
                                mb: 1,
                                border: 1,
                                borderColor: 'divider',
                                borderRadius: 1
                            }}
                        >
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="h6">{item.title}</Typography>
                                {item.videoUrl && (
                                    <Typography variant="body2" color="textSecondary">
                                        Video: {item.videoUrl}
                                    </Typography>
                                )}
                                {item.amazonUrl && (
                                    <Typography variant="body2" color="textSecondary">
                                        Amazon: {item.amazonUrl}
                                    </Typography>
                                )}
                            </Box>
                            <IconButton 
                                onClick={() => handleDelete(item.id)}
                                color="error"
                            >
                                Delete
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
};