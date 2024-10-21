import React from 'react';
import { Box, Breadcrumbs, Grid, Card, Typography, CardActionArea, Icon } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Home as HomeIcon, Assessment as AssessmentIcon } from '@mui/icons-material';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import { SvgIconComponent } from '@mui/icons-material';

interface ModuleCardProps {
  title: string;
  description: string;
  icon: SvgIconComponent;
  path: string;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ title, description, icon, path }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)', boxShadow: 3 } }}>
      <CardActionArea 
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', p: 2 }}
        onClick={handleClick}
      >
        <Box sx={{ p: 2, bgcolor: 'primary.main', borderRadius: '50%', mb: 2 }}>
          <Icon component={icon} sx={{ fontSize: 40, color: 'white' }} />
        </Box>
        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {description}
        </Typography>
      </CardActionArea>
    </Card>
  );
};

const Home: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', p: 3 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', color: 'inherit', textDecoration: 'none' }}>
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Dashboard
        </Link>
      </Breadcrumbs>
      
      <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 4 }}>
        Panel de Administración
      </Typography>

      <Typography variant="h5" sx={{ fontWeight: 'medium', mb: 3 }}>
        Módulos
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <ModuleCard 
            title="Reembolsos" 
            description="Gestión de reembolsos WEB"
            icon={DescriptionRoundedIcon}
            path="/refund"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <ModuleCard 
            title="Análisis" 
            description="Visualiza y analiza datos importantes para la toma de decisiones."
            icon={AssessmentIcon}
            path="/analysis"
          />
        </Grid>

        {/* Puedes agregar más módulos aquí */}
      </Grid>
    </Box>
  );
};

export default Home;