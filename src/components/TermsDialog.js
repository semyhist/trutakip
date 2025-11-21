import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Checkbox, FormControlLabel, Divider } from '@mui/material';

const TermsDialog = ({ open, onAccept, onReject }) => {
  const [kullanim, setKullanim] = useState(false);
  const [gizlilik, setGizlilik] = useState(false);

  const kabul = () => {
    if (kullanim && gizlilik) {
      onAccept();
    }
  };

  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <DialogTitle sx={{ pb: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Kullanım Şartları ve Gizlilik Sözleşmesi
        </Typography>
      </DialogTitle>
      
      <DialogContent sx={{ maxHeight: 400, overflowY: 'auto' }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
            Kullanım Şartları
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
            Bu uygulama TRÜ Bilgisayar Mühendisliği öğrencileri için devamsızlık ve not takibi amacıyla geliştirilmiştir.
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, lineHeight: 1.6 }}>
            • Uygulamayı yalnızca eğitim amaçlı kullanabilirsiniz
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, lineHeight: 1.6 }}>
            • Verilerinizin doğruluğundan siz sorumlusunuz
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, lineHeight: 1.6 }}>
            • Resmi devamsızlık durumunuz için mutlaka öğrenci işlerine başvurun
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
            • Uygulamayı kötüye kullanmayacağınızı kabul ediyorsunuz
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#1976d2' }}>
            Gizlilik Sözleşmesi
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
            Kişisel verilerinizin korunması bizim için önemlidir.
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, lineHeight: 1.6 }}>
            • Verileriniz Firebase güvenli veritabanında saklanır
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, lineHeight: 1.6 }}>
            • Şifreniz şifrelenerek saklanır
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, lineHeight: 1.6 }}>
            • Verileriniz üçüncü taraflarla paylaşılmaz
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, lineHeight: 1.6 }}>
            • İstediğiniz zaman hesabınızı silebilirsiniz
          </Typography>
          <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.6 }}>
            • Uygulama yalnızca gerekli verileri toplar
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Box sx={{ width: '100%' }}>
          <FormControlLabel
            control={<Checkbox checked={kullanim} onChange={(e) => setKullanim(e.target.checked)} />}
            label={<Typography variant="body2">Kullanım şartlarını okudum ve kabul ediyorum</Typography>}
            sx={{ mb: 1, display: 'flex', alignItems: 'flex-start' }}
          />
          <FormControlLabel
            control={<Checkbox checked={gizlilik} onChange={(e) => setGizlilik(e.target.checked)} />}
            label={<Typography variant="body2">Gizlilik sözleşmesini okudum ve kabul ediyorum</Typography>}
            sx={{ mb: 2, display: 'flex', alignItems: 'flex-start' }}
          />
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button onClick={onReject} color="inherit">
              Reddet
            </Button>
            <Button 
              onClick={kabul} 
              variant="contained" 
              disabled={!kullanim || !gizlilik}
              sx={{ minWidth: 100 }}
            >
              Kabul Et
            </Button>
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default TermsDialog;