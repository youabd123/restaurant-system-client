import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

export default function PageHeader({ title, description, action }) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      sx={{
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Typography variant="h4" component="h1" fontWeight={700}>
          {title}
        </Typography>

        {description && (
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            {description}
          </Typography>
        )}
      </Box>

      {action && <Box>{action}</Box>}
    </Stack>
  )
}
