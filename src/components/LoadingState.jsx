import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export default function LoadingState({ message = 'Loading...' }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
      <Stack spacing={2} alignItems="center">
        <CircularProgress />
        <Typography color="text.secondary">{message}</Typography>
      </Stack>
    </Box>
  )
}
