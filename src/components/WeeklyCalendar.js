import React from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Card, CardContent, Button, Chip } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { courses, dayNames } from '../data/courses';

const WeeklyCalendar = ({ userData, updateAbsence, onClose }) => {
  var gunler = ['tuesday', 'wednesday', 'thursday', 'friday'];

  // günün ders programını getir
  const gunProgrami = (gun) => {
    var program = [];
    Object.entries(courses).forEach(([key, ders]) => {
      ders.schedule.forEach(slot => {
        if (slot.day === gun) {
          program.push({ dersKey: key, ders, ...slot });
        }
      });
    });
    return program.sort((a, b) => a.time.localeCompare(b.time));
  };

  const devamsizlikEkle = (dersKey, saat) => {
    if (dersKey == 'english' && userData.englishExempt) return;
    
    var mevcut = userData.absences[dersKey] || 0;
    var yeni = mevcut + saat;
    updateAbsence(dersKey, yeni);
  };

  // tüm günü ekle
  const tumGunEkle = (gun) => {
    var program = gunProgrami(gun);
    program.forEach(item => {
      devamsizlikEkle(item.dersKey, item.hours);
    });
  };

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6">Haftalık Program</Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2 }}>
        {gunler.map(gun => {
          const program = gunProgrami(gun);
          return (
            <Card key={gun} sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" color="primary">
                    {dayNames[gun]}
                  </Typography>
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={() => tumGunEkle(gun)}
                  >
                    Tüm Gün
                  </Button>
                </Box>

                {program.map((item, index) => {
                  var muaf = item.dersKey == 'english' && userData.englishExempt;
                  var mevcut = userData.absences[item.dersKey] || 0;
                  var kalan = item.ders.limit - mevcut;
                  
                  return (
                    <Box 
                      key={index}
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        p: 2,
                        mb: 1,
                        bgcolor: muaf ? '#f5f5f5' : 'white',
                        border: '1px solid #e0e0e0',
                        borderRadius: 1,
                        opacity: muaf ? 0.6 : 1
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle2">
                          {item.ders.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.time} ({item.hours} saat)
                        </Typography>
                        {!muaf && (
                          <Typography variant="caption" color="text.secondary">
                            Kalan: {kalan} saat
                          </Typography>
                        )}
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {muaf && <Chip label="Muaf" size="small" color="success" />}
                        {!muaf && (
                          <Button
                            variant="contained"
                            size="small"
                            color={kalan <= 2 ? 'error' : 'primary'}
                            onClick={() => devamsizlikEkle(item.dersKey, item.hours)}
                          >
                            +{item.hours}
                          </Button>
                        )}
                      </Box>
                    </Box>
                  );
                })}
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default WeeklyCalendar;
