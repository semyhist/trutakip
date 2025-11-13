import React, { useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { ThemeProvider } from './context/ThemeContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { APP_VERSION } from './config/version';

const muiTema = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const [kullanici, setKullanici] = useState(null);
  const [kullaniciAdi, setKullaniciAdi] = useState('');
  var [yukleniyor, setYukleniyor] = useState(true);

  // sayfa yüklenince kullanıcı kontrol et
  useEffect(() => {
    // versiyon kontrolü - eski versiyon varsa cache temizle
    var kayitliVersiyon = localStorage.getItem('appVersion');
    if (kayitliVersiyon != APP_VERSION) {
      console.log('Yeni versiyon tespit edildi, cache temizleniyor...');
      localStorage.clear();
      localStorage.setItem('appVersion', APP_VERSION);
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => caches.delete(name));
        });
      }
      window.location.reload();
      return;
    }
    
    const kullaniciKontrol = async () => {
      var kayitliId = localStorage.getItem('currentUser');
      if (kayitliId) {
        try {
          const kullaniciDoc = await getDoc(doc(db, 'users', kayitliId));
          if (kullaniciDoc.exists()) {
            setKullanici(kayitliId);
            setKullaniciAdi(kullaniciDoc.data().username);
          } else {
            localStorage.removeItem('currentUser');
          }
        } catch (err) {
          console.error('Kullanıcı verisi yüklenemedi:', err);
          localStorage.removeItem('currentUser');
        }
      }
      setYukleniyor(false);
    };
    
    kullaniciKontrol();
  }, []);

  const girisYap = (userId, username) => {
    setKullanici(userId)
    setKullaniciAdi(username)
  };

  const cikisYap = () => {
    setKullanici(null)
    setKullaniciAdi('')
  };

  if (yukleniyor) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <ThemeProvider>
      <MuiThemeProvider theme={muiTema}>
        <CssBaseline />
        {kullanici ? (
          <Dashboard 
            userId={kullanici} 
            username={kullaniciAdi} 
            onLogout={cikisYap} 
          />
        ) : (
          <Login onLogin={girisYap} />
        )}
      </MuiThemeProvider>
    </ThemeProvider>
  );
}

export default App;
