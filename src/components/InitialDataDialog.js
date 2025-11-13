import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  Typography, 
  Box,
  Switch,
  FormControlLabel,
  Paper
} from '@mui/material';
import { courses, onlineCourses } from '../data/courses';

const InitialDataDialog = ({ open, onComplete }) => {
  var [adim, setAdim] = useState(0);
  var [devamsizliklar, setDevamsizliklar] = useState({});
  var [ingilizceMusaf, setIngilizceMusaf] = useState(false);

  var dersler = Object.keys(courses).filter(key => !onlineCourses.includes(key));
  var toplamAdim = dersler.length + 1;

  // ileri butonuna basıldığında
  const ileri = () => {
    if (adim < toplamAdim - 1) {
      setAdim(adim + 1)
    } else {
      var sonVeri = { ...devamsizliklar };
      if (ingilizceMusaf) {
        sonVeri.english = 0;
      }
      onComplete(sonVeri, ingilizceMusaf);
    }
  };

  const geri = () => {
    setAdim(adim - 1)
  };

  const devamsizlikGuncelle = (dersKey, deger) => {
    setDevamsizliklar(prev => ({
      ...prev,
      [dersKey]: Math.max(0, parseInt(deger) || 0)
    }));
  };

  const aktifDers = () => {
    if (adim < dersler.length) {
      return dersler[adim];
    }
    return null;
  };

  var dersKey = aktifDers();
  var ders = dersKey ? courses[dersKey] : null;
  var ingilizceAdimi = adim == dersler.length;

  return (
    <Dialog 
      open={open} 
      maxWidth="sm" 
      fullWidth
      disableEscapeKeyDown
      PaperProps={{
        sx: { 
          borderRadius: 3,
          m: { xs: 1, sm: 2 },
          maxHeight: { xs: '95vh', sm: '90vh' }
        }
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', pb: 1, px: { xs: 2, sm: 3 }, pt: { xs: 2, sm: 3 } }}>
        <Typography variant="h5" color="primary" sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
          Hoş Geldin! 🎓
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
          Mevcut devamsızlık durumunu girelim
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ px: { xs: 2, sm: 3 }, py: { xs: 2, sm: 2 } }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 2, sm: 3 } }}>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ fontSize: { xs: '0.875rem', sm: '1rem' }, fontWeight: 600 }}
          >
            {adim + 1} / {toplamAdim}
          </Typography>
        </Box>

        {ders && (
          <Paper sx={{ p: { xs: 2, sm: 3 }, textAlign: 'center' }}>
            <Typography 
              variant="h4" 
              color="primary" 
              gutterBottom
              sx={{ 
                fontSize: { xs: '1.5rem', sm: '2rem' },
                fontWeight: 800,
                mb: 2
              }}
            >
              {ders.name}
            </Typography>
            
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                mb: 2,
                fontSize: { xs: '0.75rem', sm: '0.875rem' }
              }}
            >
              Haftalık: {ders.weeklyHours} saat<br />
              Devamsızlık Hakkı: {ders.limit} saat
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 3,
                  fontSize: { xs: '0.95rem', sm: '1.1rem' },
                  fontWeight: 600
                }}
              >
                Kaç gün gelmedin?
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                {(() => {
                  const gunlukSaat = ders.schedule.length > 0 ? ders.schedule[0].hours : 2;
                  return [1, 2, 3, 4, 5, 6, 7].map(gun => (
                    <Button
                      key={gun}
                      variant={devamsizliklar[dersKey] === gun * gunlukSaat ? 'contained' : 'outlined'}
                      onClick={() => devamsizlikGuncelle(dersKey, gun * gunlukSaat)}
                      sx={{ minWidth: { xs: 45, sm: 50 }, fontWeight: 700 }}
                    >
                      {gun}
                    </Button>
                  ));
                })()}
              </Box>

              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ mb: 2, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
              >
                veya manuel gir:
              </Typography>
              
              <TextField
                type="number"
                label="Devamsızlık (saat)"
                value={devamsizliklar[dersKey] || ''}
                onChange={(e) => devamsizlikGuncelle(dersKey, e.target.value)}
                inputProps={{ min: 0, max: ders.limit + 10 }}
                fullWidth
                size="small"
                sx={{ mb: 1 }}
              />

              <Typography 
                variant="caption" 
                color="text.secondary"
                sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
              >
                Emin değilsen 0 seç, sonra düzenleyebilirsin
              </Typography>
            </Box>
          </Paper>
        )}

        {ingilizceAdimi && (
          <Paper sx={{ p: { xs: 2, sm: 3 }, textAlign: 'center' }}>
            <Typography 
              variant="h6" 
              color="primary" 
              gutterBottom
              sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}
            >
              İngilizce I Dersi
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 3,
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              İngilizce dersinden muaf mısın?
            </Typography>

            <FormControlLabel
              control={
                <Switch 
                  checked={ingilizceMusaf}
                  onChange={(e) => setIngilizceMusaf(e.target.checked)}
                  size="large"
                />
              }
              label={ingilizceMusaf ? "Evet, muafım" : "Hayır, muaf değilim"}
              sx={{ mb: 2 }}
            />

            <Typography 
              variant="caption" 
              color="text.secondary" 
              display="block"
              sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
            >
              Muaf isen devamsızlık takibi yapılmayacak
            </Typography>
          </Paper>
        )}
      </DialogContent>

      <DialogActions sx={{ p: { xs: 2, sm: 3 }, justifyContent: 'space-between', gap: 2 }}>
        <Button 
          onClick={geri} 
          disabled={adim === 0}
          variant="outlined"
          size="large"
          sx={{ flex: 1, maxWidth: 120 }}
        >
          Geri
        </Button>
        
        <Button 
          onClick={ileri}
          variant="contained"
          size="large"
          sx={{ flex: 1, maxWidth: 120 }}
        >
          {adim === toplamAdim - 1 ? 'Tamamla' : 'İleri'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InitialDataDialog;
