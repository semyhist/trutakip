import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, Person, Lock } from '@mui/icons-material';
import { doc, setDoc, query, where, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import InitialDataDialog from './InitialDataDialog';

const Login = ({ onLogin }) => {
  var [kullaniciAdi, setKullaniciAdi] = useState('');
  var [adSoyad, setAdSoyad] = useState('');
  var [sifre, setSifre] = useState('');
  const [kayitModu, setKayitModu] = useState(false);
  const [hata, setHata] = useState('');
  var [yukleniyor, setYukleniyor] = useState(false);
  const [ilkVeriDialog, setIlkVeriDialog] = useState(false);
  const [bekleyenId, setBekleyenId] = useState(null);
  const [sifreGoster, setSifreGoster] = useState(false);

  const formGonder = async (e) => {
    e.preventDefault();
    
    if (!kullaniciAdi || !sifre) {
      setHata('Kullanıcı adı ve şifre gerekli');
      return;
    }

    if (kayitModu && !adSoyad) {
      setHata('Ad soyad gerekli');
      return;
    }

    if (sifre.length < 4) {
      setHata('Şifre en az 4 karakter olmalı');
      return;
    }

    setYukleniyor(true);
    setHata('');

    try {
      if (kayitModu) {
        var q = query(collection(db, 'users'), where('username', '==', kullaniciAdi));
        var sonuc = await getDocs(q);
        
        if (!sonuc.empty) {
          setHata('Bu kullanıcı adı zaten kullanılıyor');
          setYukleniyor(false);
          return;
        }
        
        var yeniId = Date.now().toString();
        setBekleyenId(yeniId)
        setIlkVeriDialog(true);
        setYukleniyor(false);
      } else {
        var q = query(collection(db, 'users'), where('username', '==', kullaniciAdi), where('password', '==', sifre));
        var sonuc = await getDocs(q);
        
        if (sonuc.empty) {
          setHata('Kullanıcı adı veya şifre hatalı');
          setYukleniyor(false);
          return;
        }
        
        var kullaniciDoc = sonuc.docs[0];
        localStorage.setItem('currentUser', kullaniciDoc.id)
        onLogin(kullaniciDoc.id, kullaniciDoc.data().displayName || kullaniciAdi);
      }
    } catch (err) {
      console.error('Hata:', err);
      setHata('Bir hata oluştu. Tekrar deneyin.');
    }
    
    setYukleniyor(false);
  };

  const ilkVeriTamamla = async (devamsizlikVerisi, ingilizceMusaf) => {
    try {
      await setDoc(doc(db, 'users', bekleyenId), {
        username: kullaniciAdi,
        displayName: adSoyad,
        password: sifre,
        absences: devamsizlikVerisi,
        englishExempt: ingilizceMusaf,
        createdAt: new Date()
      });
      
      localStorage.setItem('currentUser', bekleyenId);
      setIlkVeriDialog(false);
      onLogin(bekleyenId, adSoyad);
    } catch (err) {
      console.error('Kayıt hatası:', err);
      setHata('Kayıt tamamlanamadı. Tekrar deneyin.');
      setIlkVeriDialog(false);
      setBekleyenId(null);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      position: 'relative',
      p: 2,
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 10% 20%, rgba(139, 0, 0, 0.15) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(25, 118, 210, 0.15) 0%, transparent 50%)',
        pointerEvents: 'none'
      }
    }}>
      <Paper elevation={0} sx={{ 
        p: 4, 
        maxWidth: 420, 
        width: '100%',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: 4,
        border: '1px solid rgba(255, 255, 255, 0.2)',
        position: 'relative',
        zIndex: 1
      }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ 
            width: 80, 
            height: 80, 
            borderRadius: 3, 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2
          }}>
            <img src="/trulogo.png" alt="TRÜ Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a1a', mb: 1 }}>
            TRÜ Devamsızlık
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
            Bilgisayar Mühendisliği
          </Typography>
        </Box>
        
        {hata && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2, '& .MuiAlert-message': { fontWeight: 500 } }}>
            {hata}
          </Alert>
        )}
        
        <form onSubmit={formGonder}>
          {kayitModu && (
            <TextField
              fullWidth
              label="Ad Soyad"
              value={adSoyad}
              onChange={(e) => setAdSoyad(e.target.value)}
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: '#1976d2' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': { borderColor: '#1976d2' },
                  '&.Mui-focused fieldset': { borderColor: '#1976d2' },
                },
                '& .MuiInputLabel-root.Mui-focused': { color: '#1976d2' },
              }}
            />
          )}
          <TextField
            fullWidth
            label="Kullanıcı Adı"
            value={kullaniciAdi}
            onChange={(e) => setKullaniciAdi(e.target.value)}
            margin="normal"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{ color: '#1976d2' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover fieldset': { borderColor: '#1976d2' },
                '&.Mui-focused fieldset': { borderColor: '#1976d2' },
              },
              '& .MuiInputLabel-root.Mui-focused': { color: '#1976d2' },
            }}
          />
          <TextField
            fullWidth
            type={sifreGoster ? 'text' : 'password'}
            label="Şifre"
            value={sifre}
            onChange={(e) => setSifre(e.target.value)}
            margin="normal"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ color: '#1976d2' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setSifreGoster(!sifreGoster)} edge="end">
                    {sifreGoster ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover fieldset': { borderColor: '#1976d2' },
                '&.Mui-focused fieldset': { borderColor: '#1976d2' },
              },
              '& .MuiInputLabel-root.Mui-focused': { color: '#1976d2' },
            }}
          />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ 
              mt: 3, 
              mb: 2,
              py: 1.5,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
              boxShadow: '0 8px 25px rgba(25, 118, 210, 0.3)',
              fontSize: '1.1rem',
              fontWeight: 600,
              '&:hover': {
                background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 30px rgba(25, 118, 210, 0.4)',
              },
              '&:disabled': { background: '#ccc' },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            disabled={yukleniyor}
          >
            {yukleniyor ? 'Yükleniyor...' : (kayitModu ? '🎓 Kayıt Ol' : '🚀 Giriş Yap')}
          </Button>
          
          <Button
            fullWidth
            onClick={() => setKayitModu(!kayitModu)}
            disabled={yukleniyor}
            sx={{
              py: 1,
              borderRadius: 2,
              color: '#1976d2',
              fontWeight: 600,
              '&:hover': { background: 'rgba(25, 118, 210, 0.1)' },
            }}
          >
            {kayitModu ? 'Zaten hesabın var mı? Giriş yap' : 'Hesabın yok mu? Kayıt ol'}
          </Button>
        </form>
      </Paper>
      
      <InitialDataDialog 
        open={ilkVeriDialog}
        onComplete={ilkVeriTamamla}
      />
    </Box>
  );
};

export default Login;
