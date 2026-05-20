import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export default function EmptyState({
  title = 'No data found',
  description = 'There is nothing to show right now.',
}) {
  return (
    <Box
      sx={{
        border: 1,
        borderColor: 'divider',
        borderRadius: 2,
        p: 4,
        textAlign: 'center',
      }}
    >
      <Typography variant="h6" fontWeight={700}>
        {title}
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        {description}
      </Typography>
    </Box>
  )
}
