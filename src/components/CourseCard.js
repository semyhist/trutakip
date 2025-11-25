import React from 'react';
import { Card, CardContent, Typography, Switch, FormControlLabel, Box, IconButton, Paper, Button } from '@mui/material';
import { Remove, Schedule, TrendingUp, Warning, CheckCircle } from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';
import { dayNames } from '../data/courses';

const CourseCard = ({ courseKey, course, currentAbsence, onUpdate, isExempt, onToggleExempt }) => {
  const { theme } = useTheme();
  var kalanHak = Math.max(0, course.limit - currentAbsence);
  var yuzde = (currentAbsence / course.limit) * 100;
  
  // durum ikonunu belirle
  const durumIkonu = () => {
    if (isExempt) return <CheckCircle sx={{ color: '#4caf50', fontSize: 20 }} />;
    if (currentAbsence >= course.limit) return <Warning sx={{ color: '#8b0000', fontSize: 20 }} />;
    if (kalanHak <= 2) return <Warning sx={{ color: '#ff6b35', fontSize: 20 }} />;
    return <CheckCircle sx={{ color: '#1976d2', fontSize: 20 }} />;
  };

  // durum rengini belirle
  const durumRengi = () => {
    if (isExempt) return '#4caf50';
    if (currentAbsence >= course.limit) return '#8b0000';
    if (kalanHak <= 2) return '#ff6b35';
    return '#1976d2';
  };

  const ekle = (saat) => {
    onUpdate(currentAbsence + saat)
  };

  const cikar = (saat) => {
    onUpdate(Math.max(0, currentAbsence - saat))
  };

  const dersProgrami = () => {
    return course.schedule.map(slot => ({
      gun: slot.day,
      gunAdi: dayNames[slot.day],
      saat: slot.time,
      saatSayisi: slot.hours
    }));
  };

  var renk = durumRengi();

  return (
    <Card 
      elevation={0}
      sx={{ 
        mb: 3,
        background: theme.bg.card,
        backdropFilter: 'blur(20px)',
        border: `1px solid ${theme.border}`,
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 20px 40px ${renk}40`,
          border: `1px solid ${renk}60`
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${renk}, ${renk}dd)`
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: theme.text.primary, mb: 0.5, fontSize: '1.1rem' }}>
              {course.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Schedule sx={{ fontSize: 16, color: theme.text.tertiary }} />
              <Typography variant="body2" sx={{ color: theme.text.secondary }}>
                {course.weeklyHours} saat/hafta
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {durumIkonu()}
            <Typography variant="body2" sx={{ fontWeight: 600, color: renk }}>
              {isExempt ? 'Muaf' : currentAbsence > course.limit ? 'KALDINIZ!' : currentAbsence === course.limit ? 'Sınırdasınız!' : kalanHak <= 2 ? 'Dikkat!' : 'Güvenli'}
            </Typography>
          </Box>
        </Box>

        {onToggleExempt && (
          <Box sx={{ mb: 3 }}>
            <FormControlLabel
              control={<Switch checked={isExempt} onChange={onToggleExempt} />}
              label={<Typography sx={{ fontWeight: 500, color: theme.text.primary }}>Bu dersten muafım</Typography>}
            />
          </Box>
        )}

        {!isExempt && (
          <>
            <Paper sx={{ p: 2.5, mb: 3, background: theme.bg.paper, border: `1px solid ${theme.border}`, borderRadius: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: theme.text.primary }}>
                  Devamsızlık Durumu
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TrendingUp sx={{ fontSize: 16, color: renk }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, color: renk }}>
                    {currentAbsence}
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.text.secondary }}>
                    / {course.limit} saat
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ height: 8, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: 4, overflow: 'hidden', mb: 1 }}>
                <Box sx={{
                  height: '100%',
                  width: `${Math.min(yuzde, 100)}%`,
                  background: `linear-gradient(90deg, ${renk}, ${renk}dd)`,
                  transition: 'width 0.5s ease'
                }} />
              </Box>
              
              <Typography variant="body2" sx={{ color: renk, fontWeight: 600 }}>
                Kalan hakkın: {kalanHak} saat
              </Typography>
            </Paper>

            <Box sx={{ mb: 3 }}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 2.5, 
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: `2px solid ${renk}30`,
                  borderRadius: 4,
                  boxShadow: `0 8px 32px ${renk}20`
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  <Box 
                    sx={{ 
                      textAlign: 'center', 
                      py: 1.5, 
                      px: 3,
                      background: `linear-gradient(135deg, ${renk}20 0%, ${renk}10 100%)`,
                      borderRadius: 3,
                      border: `2px solid ${renk}40`
                    }}
                  >
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        fontWeight: 800, 
                        color: renk,
                        lineHeight: 1
                      }}
                    >
                      {currentAbsence}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: theme.text.secondary, 
                        fontWeight: 600,
                        fontSize: '0.7rem'
                      }}
                    >
                      SAAT
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mb: 2 }}>
                  {dersProgrami().map((slot, idx) => (
                    <Button
                      key={idx}
                      variant="contained"
                      size="small"
                      onClick={() => ekle(slot.saatSayisi)}
                      sx={{ 
                        minWidth: 80,
                        background: `linear-gradient(135deg, ${renk} 0%, ${renk}dd 100%)`,
                        '&:hover': { background: `linear-gradient(135deg, ${renk}dd 0%, ${renk}bb 100%)` }
                      }}
                    >
                      {slot.gunAdi}
                    </Button>
                  ))}
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                  <IconButton 
                    onClick={() => cikar(1)} 
                    disabled={currentAbsence === 0} 
                    sx={{ 
                      width: 40,
                      height: 40,
                      background: theme.bg.paper,
                      color: theme.text.primary,
                      border: `1px solid ${theme.border}`,
                      '&:hover': { 
                        borderColor: renk,
                        color: renk
                      }, 
                      '&:disabled': { 
                        opacity: 0.3
                      }
                    }}
                  >
                    <Remove sx={{ fontSize: 20 }} />
                  </IconButton>
                </Box>
              </Paper>
            </Box>

            {course.schedule.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" sx={{ color: theme.text.tertiary, display: 'block', mb: 1 }}>
                  Ders Saatleri:
                </Typography>
                {dersProgrami().map((slot, idx) => (
                  <Typography key={idx} variant="body2" sx={{ color: theme.text.secondary, fontSize: '0.85rem' }}>
                    • {slot.gunAdi} {slot.saat} ({slot.saatSayisi} saat)
                  </Typography>
                ))}
              </Box>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseCard;
