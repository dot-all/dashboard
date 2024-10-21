import React, { useState } from 'react';
import { 
  Button, Typography, Box, Stepper, Step, StepLabel, Snackbar,
  Alert, LinearProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';
import DoneRoundedIcon from '@mui/icons-material/Done';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';

type ConnectionStatus = 'default' | 'connecting' | 'connected' | 'error';
type DownloadStatus = 'default' | 'downloading' | 'completed' | 'error';

const steps = [
  {
    title: 'Conectar al Servidor',
    description: 'Establece conexión con el servidor FTP.',
    icon: <CloudQueueIcon />,
  },
  {
    title: 'Descargar Archivos',
    description: 'Descarga los archivos PDF del servidor.',
    icon: <CloudDownloadRoundedIcon />,
  },
  {
    title: 'Completado',
    description: 'Proceso de descarga completado.',
    icon: <DoneRoundedIcon />,
  },
];

export default function Download() {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('default');
  const [downloadStatus, setDownloadStatus] = useState<DownloadStatus>('default');
  const [currentStep, setCurrentStep] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('info');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleConnect = async () => {
    setConnectionStatus('connecting');
    setIsLoading(true);

    const ftpConfig = {
      host: import.meta.env.VITE_FTP_HOST,
      user: import.meta.env.VITE_FTP_USER,
      password: import.meta.env.VITE_FTP_PASSWORD,
      port: Number(import.meta.env.VITE_FTP_PORT)
    };

    console.log('Configuración FTP:', ftpConfig);

    try {
      const response = await window.ipcRenderer.invoke('connect-to-ftp', ftpConfig);
      
      console.log('Respuesta de la conexión FTP:', response);
      
      if (response.success) {
        setConnectionStatus('connected');
        handleNextStep();
        setSnackbarMessage('Conexión establecida con éxito.');
        setSnackbarSeverity('success');
      } else {
        setConnectionStatus('error');
        setSnackbarMessage(`Error en establecer conexión: ${response.error}`);
        setSnackbarSeverity('error');
      }
    } catch (error) {
      setConnectionStatus('error');
      let errorMessage = 'Error inesperado';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      setSnackbarMessage(`Error inesperado: ${errorMessage}`);
      setSnackbarSeverity('error');
      console.error(error);
    } finally {
      setIsLoading(false);
      setSnackbarOpen(true);
    }
  };

  const handleDownload = async () => {
    setDownloadStatus('downloading');
    setIsLoading(true);

    try {
      const response = await window.ipcRenderer.invoke('download-pdf-files');
      
      console.log('Respuesta de la descarga de archivos:', response);

      if (response.success) {
        setDownloadStatus('completed');
        handleNextStep();
        setSnackbarMessage('Descarga completada con éxito.');
        setSnackbarSeverity('success');
      } else {
        setDownloadStatus('error');
        setSnackbarMessage(`Error en la descarga: ${response.error}`);
        setSnackbarSeverity('error');
      }
    } catch (error) {
      setDownloadStatus('error');
      let errorMessage = 'Error inesperado';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      setSnackbarMessage(`Error inesperado: ${errorMessage}`);
      setSnackbarSeverity('error');
      console.error(error);
    } finally {
      setIsLoading(false);
      setSnackbarOpen(true);
    }
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBackStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      const response = await window.ipcRenderer.invoke('close-ftp-connection');
      console.log('Respuesta del cierre de conexión FTP:', response);
      navigate('/charge-refund');
    } catch (error) {
      console.error('Error al cerrar la conexión FTP:', error);
      setSnackbarMessage('Error al cerrar la conexión FTP');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: '24px', width: '100%' }}>
      {/* ... (código existente para la navegación y el título) */}

      <Box className="p-10 h-[350px] mt-2 rounded-3xl bg-zinc-50">
        <Stepper activeStep={currentStep} alternativeLabel>
          {steps.map((step) => (
            <Step key={step.title}>
              <StepLabel StepIconComponent={() => React.cloneElement(step.icon, { color: currentStep >= steps.indexOf(step) ? 'primary' : 'disabled' })}>
                {step.title}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 4, mb: 2 }}>
          <Typography variant="h6" align="center" gutterBottom>
            {steps[currentStep].title}
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary">
            {steps[currentStep].description}
          </Typography>
        </Box>

        <Box className="flex justify-center mt-4">
          {currentStep === 0 && (
            <Box sx={{ width: '100%', maxWidth: 200 }} className="rounded-full">
              {isLoading ? (
                <LinearProgress sx={{ mb: 2 }} />
              ) : (
                <Button 
                  variant="contained" 
                  onClick={handleConnect} 
                  sx={{ textTransform: 'none', borderRadius: '10px', padding: "10px", width: "200px" }}
                  disabled={connectionStatus === 'connecting' || connectionStatus === 'connected'}
                >
                  {connectionStatus === 'connected' ? 'Conectado' : 'Establecer Conexión'}
                </Button>
              )}
            </Box>
          )}

          {currentStep === 1 && (
            <Box sx={{ width: '100%', maxWidth: 200 }} className="rounded-full">
              {isLoading ? (
                <LinearProgress sx={{ mb: 2 }} />
              ) : (
                <Button
                  variant="contained" 
                  onClick={handleDownload} 
                  sx={{ textTransform: 'none', borderRadius: '10px', padding: "10px", width: "200px" }}
                  disabled={connectionStatus !== 'connected' || downloadStatus === 'downloading' || downloadStatus === 'completed'}
                >
                  {downloadStatus === 'completed' ? 'Descargado' : 'Descargar Archivos'}
                </Button>
              )}
            </Box>
          )}

          {currentStep === 2 && (
            <Button 
              sx={{ textTransform: 'none', borderRadius: '10px', padding: "10px", width: "200px" }}
              variant="contained"
              onClick={handleComplete}
              disabled={isLoading}
            >
              {isLoading ? <LinearProgress /> : 'Ir a Cargar'}
            </Button>
          )}
        </Box>
      </Box>
      
      <Box className="flex mt-3 gap-2">
        <Button
          sx={{ textTransform: 'none', borderRadius: "10px" }}
          variant="outlined"
          onClick={handleBackStep}
          disabled={currentStep === 0 || isLoading}
        >
          Anterior
        </Button>
        <Button
          sx={{ textTransform: 'none', borderRadius: "10px" }}
          variant="contained"
          onClick={handleNextStep}
          disabled={currentStep === steps.length - 1 || (currentStep === 0 && connectionStatus !== 'connected') || (currentStep === 1 && downloadStatus !== 'completed') || isLoading}
        >
          Siguiente
        </Button>
      </Box>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}