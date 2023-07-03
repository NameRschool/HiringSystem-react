import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import {useNavigate} from 'react-router-dom';


export default function HomePage() {
    const navigate = useNavigate()

    return (
        <Card sx={{ maxWidth: 450}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="540"
                    image={`${process.env.PUBLIC_URL}/Community.jpg`}
                    alt="community"
                />
                <CardContent>

                    <Typography variant="body2" color="text.secondary">
                        Join our community-driven hiring site today and experience the transformative power of unity, hiring excellence, and shared growth. Unite with us, hire with confidence, and together, let's thrive.
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={()=>navigate('/itemJob')}>
                    login
                </Button>
            </CardActions>
        </Card>
    );
}