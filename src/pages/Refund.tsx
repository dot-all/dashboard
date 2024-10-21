import { Typography, Box } from '@mui/material';

export default function Refund() {
  return (
    <Box sx={{ padding: '16px' }}>
      {/* Encabezado */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <Typography 
          variant="body2" 
          sx={{ color: 'gray', mr: 1 }}
        >
          Reembolsos
        </Typography>
      </Box>
      <h2 className='text-4xl'>Reembolsos</h2>

    </Box>
  )
}
