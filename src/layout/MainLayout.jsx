import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Link, useNavigate } from "react-router-dom";

const navigationItems = [
  { label: 'Home', href: '/' },
  { label: 'Categories', href: '/categories' },
  { label: 'Menu Items', href: '/menu-items' },
  { label: 'Orders', href: '/orders' },
]

export default function MainLayout({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" color="primary" elevation={0}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', gap: 3 }}>
            <Typography
              variant="h6"
              component="a"
              href="/"
              sx={{
                color: 'inherit',
                fontWeight: 700,
                letterSpacing: 0.2,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              Restaurant System
            </Typography>

            <Stack
              component="nav"
              direction="row"
              spacing={1}
              sx={{
                display: { xs: 'none', sm: 'flex' },
                alignItems: 'center',
              }}
            >
              {navigationItems.map((item) => (
                <Button
                  key={item.href}
                  href={item.href}
                  color="inherit"
                  sx={{
                    fontWeight: 600,
                    textTransform: 'none',
                  }}
                >
                  {item.label}
                </Button>
              ))}

              
              {!token && (
                <Button
                  component={Link}
                  to="/register"
                  color="inherit"
                  sx={{
                    fontWeight: 600,
                    textTransform: "none",
                    marginLeft: "1rem",
                  }}
                >
                  Register
                </Button>
              )}

              
              {!token ? (
                <Button
                  component={Link}
                  to="/login"
                  color="inherit"
                  sx={{
                    fontWeight: 600,
                    textTransform: 'none',
                    marginLeft: '1rem',
                  }}
                >
                  Login
                </Button>
              ) : (
                <Button
                  onClick={handleLogout}
                  color="inherit"
                  sx={{
                    fontWeight: 600,
                    textTransform: 'none',
                    marginLeft: '1rem',
                  }}
                >
                  Logout
                </Button>
              )}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="main" sx={{ py: { xs: 4, md: 6 } }}>
        <Container maxWidth="lg">{children}</Container>
      </Box>

      <Box
        component="footer"
        sx={{
          borderTop: 1,
          borderColor: 'divider',
          py: 3,
          mt: 'auto',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary">
            Restaurant System
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}

