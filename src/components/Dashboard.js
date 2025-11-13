import React, { useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Fab, Tabs, Tab } from '@mui/material';
import { Logout, CalendarMonth, School, EventNote, Info, LightMode, DarkMode } from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import CourseCard from './CourseCard';
import WeeklyCalendar from './WeeklyCalendar';
import RegulationsInfo from './RegulationsInfo';
import { courses, onlineCourses } from '../data/courses';

const Dashboard = ({ userId, username, onLogout }) => {
  const { isDark, toggleTheme, theme } = useTheme();
  const [kullaniciVerisi, setKullaniciVerisi] = useState(null);
  const [takvimGoster, setTakvimGoster] = useState(false);
  const [aktifSekme, setAktifSekme] = useState(0);
  const [yonetmelikGoster, setYonetmelikGoster] = useState(false);

  useEffect(() => {
    veriYukle()
  }, [userId]);

  // kullanıcı verisini firebase'den çek
  const veriYukle = async () => {
    try {
      var kullaniciDoc = await getDoc(doc(db, 'users', userId));
      if (kullaniciDoc.exists()) {
        setKullaniciVerisi(kullaniciDoc.data())
      }
    } catch (err) {
      console.error('Veri yükleme hatası:', err);
    }
  };

  const devamsizlikGuncelle = async (dersKey, yeniDeger) => {
    try {
      var guncelDevamsizliklar = { ...kullaniciVerisi.absences, [dersKey]: yeniDeger };
      await updateDoc(doc(db, 'users', userId), { absences: guncelDevamsizliklar });
      setKullaniciVerisi({ ...kullaniciVerisi, absences: guncelDevamsizliklar })
    } catch (err) {
      console.error('Güncelleme hatası:', err)
    }
  };

  // ingilizce muafiyeti değiştir
  const ingilizceMusafiyetDegistir = async () => {
    try {
      var yeniMusafiyet = !kullaniciVerisi.englishExempt;
      await updateDoc(doc(db, 'users', userId), { englishExempt: yeniMusafiyet });
      setKullaniciVerisi({ ...kullaniciVerisi, englishExempt: yeniMusafiyet })
    } catch (err) {
      console.error('Güncelleme hatası:', err);
    }
  };

  const notlariGuncelle = async (yeniNotlar) => {
    try {
      await updateDoc(doc(db, 'users', userId), { grades: yeniNotlar })
      setKullaniciVerisi({ ...kullaniciVerisi, grades: yeniNotlar });
    } catch (err) {
      console.error('Güncelleme hatası:', err);
    }
  };

  const cikisYap = () => {
    localStorage.removeItem('currentUser')
    onLogout();
  };

  if (!kullaniciVerisi) return <div>Yükleniyor...</div>;

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: theme.bg.primary,
      position: 'relative',
      transition: 'background 0.3s ease',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: isDark ? 'radial-gradient(circle at 10% 20%, rgba(139, 0, 0, 0.1) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(25, 118, 210, 0.1) 0%, transparent 50%)' : 'radial-gradient(circle at 10% 20%, rgba(25, 118, 210, 0.05) 0%, transparent 50%)',
        pointerEvents: 'none'
      }
    }}>
      <AppBar position="sticky" elevation={0} sx={{ 
        background: theme.bg.appbar, 
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${theme.border}`,
        transition: 'all 0.3s ease'
      }}>
        <Toolbar sx={{ py: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
            <Box sx={{ 
              width: 48, 
              height: 48, 
              borderRadius: 2, 
              background: 'linear-gradient(135deg, #8b0000 0%, #5a0000 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.3rem',
              fontWeight: 800,
              boxShadow: '0 4px 12px rgba(139, 0, 0, 0.3)'
            }}>
              TRÜ
            </Box>
            <Box>
              <Typography variant="h6" sx={{ color: theme.text.primary, fontWeight: 700, lineHeight: 1, fontSize: '1.1rem' }}>
                {username}
              </Typography>
              <Typography variant="body2" sx={{ color: theme.text.tertiary, fontWeight: 500, fontSize: '0.875rem' }}>
                Bilgisayar Mühendisliği
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton 
              onClick={toggleTheme} 
              sx={{ 
                color: theme.text.primary,
                '&:hover': {
                  background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                  transform: 'scale(1.1)'
                },
                transition: 'all 0.2s ease'
              }}
            >
              {isDark ? <LightMode /> : <DarkMode />}
            </IconButton>
            <IconButton 
              onClick={() => setYonetmelikGoster(true)} 
              sx={{ 
                color: theme.text.primary,
                '&:hover': {
                  background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                  transform: 'scale(1.1)'
                },
                transition: 'all 0.2s ease'
              }}
            >
              <Info />
            </IconButton>
            <IconButton 
              onClick={cikisYap} 
              sx={{ 
                color: theme.text.primary,
                '&:hover': {
                  background: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                  transform: 'scale(1.1)'
                },
                transition: 'all 0.2s ease'
              }}
            >
              <Logout />
            </IconButton>
          </Box>
        </Toolbar>

        <Box sx={{ 
          borderTop: `1px solid ${theme.border}`,
          background: theme.bg.appbar
        }}>
          <Tabs 
            value={aktifSekme} 
            onChange={(e, yeni) => setAktifSekme(yeni)}
            centered
            sx={{
              '& .MuiTab-root': {
                fontWeight: 600,
                fontSize: '1rem',
                textTransform: 'none',
                minHeight: 60,
                color: theme.text.tertiary,
                '&.Mui-selected': {
                  color: theme.text.primary,
                }
              },
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px 3px 0 0',
                background: 'linear-gradient(90deg, #8b0000, #1976d2)'
              }
            }}
          >
            <Tab 
              icon={<EventNote />} 
              label="Devamsızlık Takibi" 
              iconPosition="start"
            />
            <Tab 
              icon={<School />} 
              label="Not Takibi" 
              iconPosition="start"
            />
          </Tabs>
        </Box>
      </AppBar>

      {takvimGoster ? (
        <WeeklyCalendar 
          userData={kullaniciVerisi}
          updateAbsence={devamsizlikGuncelle}
          onClose={() => setTakvimGoster(false)}
        />
      ) : (
        <Box sx={{ p: 3, maxWidth: 800, mx: 'auto', position: 'relative', zIndex: 1 }}>
          {aktifSekme == 0 ? (
            <>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ 
                  color: theme.text.primary, 
                  fontWeight: 700,
                  mb: 1,
                  letterSpacing: '-0.5px'
                }}>
                  Devamsızlık Takibi
                </Typography>
                <Typography variant="body1" sx={{ 
                  color: theme.text.secondary, 
                  fontWeight: 500
                }}>
                  2025-2026 Güz Dönemi
                </Typography>
              </Box>
              
              {Object.entries(courses)
                .filter(([key]) => !onlineCourses.includes(key))
                .map(([key, ders]) => (
                  <CourseCard
                    key={key}
                    courseKey={key}
                    course={ders}
                    currentAbsence={kullaniciVerisi.absences[key] || 0}
                    onUpdate={(deger) => devamsizlikGuncelle(key, deger)}
                    isExempt={key === 'english' && kullaniciVerisi.englishExempt}
                    onToggleExempt={key === 'english' ? ingilizceMusafiyetDegistir : null}
                  />
                ))}
            </>
          ) : (
            <>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ 
                  color: theme.text.primary, 
                  fontWeight: 700,
                  mb: 1,
                  letterSpacing: '-0.5px'
                }}>
                  Not Takibi
                </Typography>
                <Typography variant="body1" sx={{ 
                  color: theme.text.secondary, 
                  fontWeight: 500
                }}>
                  Vize %40 • Final %60
                </Typography>
              </Box>

              {(() => {
                var toplamPuan = 0;
                var toplamKredi = 0;
                
                // tüm derslerin notlarını hesapla
                Object.entries(courses).forEach(([key, ders]) => {
                  var notlar = kullaniciVerisi.grades?.[key];
                  if (notlar?.midterm && notlar?.final) {
                    var vize = parseFloat(notlar.midterm);
                    var final = parseFloat(notlar.final);
                    if (!isNaN(vize) && !isNaN(final)) {
                      var ort = (vize * 0.4) + (final * 0.6);
                      var gpa = 0;
                      if (ort >= 90) gpa = 4.0;
                      else if (ort >= 85) gpa = 3.5;
                      else if (ort >= 80) gpa = 3.0;
                      else if (ort >= 75) gpa = 2.5;
                      else if (ort >= 70) gpa = 2.0;
                      else if (ort >= 65) gpa = 1.5;
                      else if (ort >= 60) gpa = 1.0;
                      else if (ort >= 50) gpa = 0.5;
                      
                      toplamPuan += gpa * ders.credit
                      toplamKredi += ders.credit;
                    }
                  }
                });
                
                var genelOrtalama = toplamKredi > 0 ? (toplamPuan / toplamKredi).toFixed(2) : null;
                
                return (
                  <>
                    {genelOrtalama && (
                      <Box sx={{
                        mb: 4,
                        p: 4,
                        background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.2) 0%, rgba(76, 175, 80, 0.1) 100%)',
                        border: '2px solid #4caf50',
                        borderRadius: 4,
                        boxShadow: '0 8px 32px rgba(76, 175, 80, 0.3)',
                        textAlign: 'center'
                      }}>
                        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 1, fontWeight: 600 }}>
                          Genel Not Ortalamanız (AGNO)
                        </Typography>
                        <Typography variant="h2" sx={{ 
                          fontWeight: 900, 
                          color: '#4caf50',
                          textShadow: '0 2px 10px rgba(76, 175, 80, 0.5)',
                          mb: 1
                        }}>
                          {genelOrtalama} / 4.0
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                          {toplamKredi} kredi tamamlandı
                        </Typography>
                      </Box>
                    )}
                    {Object.entries(courses).map(([key, ders]) => {
                var notlar = kullaniciVerisi.grades?.[key] || { midterm: '', final: '' };
                var gerekenFinal = notlar.midterm ? 
                  Math.max(0, Math.min(100, (60 - (parseFloat(notlar.midterm) * 0.4)) / 0.6)) : null;
                
                // not bilgisini hesapla
                var notBilgisi = notlar.midterm && notlar.final ? (() => {
                  var ort = (parseFloat(notlar.midterm) * 0.4) + (parseFloat(notlar.final) * 0.6);
                  if (ort >= 90) return { harf: 'AA', gpa: 4.0, renk: '#4caf50' };
                  if (ort >= 85) return { harf: 'BA', gpa: 3.5, renk: '#66bb6a' };
                  if (ort >= 80) return { harf: 'BB', gpa: 3.0, renk: '#81c784' };
                  if (ort >= 75) return { harf: 'CB', gpa: 2.5, renk: '#9ccc65' };
                  if (ort >= 70) return { harf: 'CC', gpa: 2.0, renk: '#cddc39' };
                  if (ort >= 65) return { harf: 'DC', gpa: 1.5, renk: '#ffeb3b' };
                  if (ort >= 60) return { harf: 'DD', gpa: 1.0, renk: '#ffc107' };
                  if (ort >= 50) return { harf: 'FD', gpa: 0.5, renk: '#ff9800' };
                  return { harf: 'FF', gpa: 0.0, renk: '#f44336' };
                })() : null;

                var ortalama = notlar.midterm && notlar.final ? 
                  ((parseFloat(notlar.midterm) * 0.4) + (parseFloat(notlar.final) * 0.6)).toFixed(2) : null;

                return (
                  <Box
                    key={key}
                    sx={{
                      mb: 3,
                      background: theme.bg.card,
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${theme.border}`,
                      borderRadius: 4,
                      overflow: 'hidden',
                      position: 'relative',
                      p: 3,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: notBilgisi ? `0 20px 40px ${notBilgisi.renk}40` : '0 20px 40px rgba(0,0,0,0.2)',
                        border: notBilgisi ? `1px solid ${notBilgisi.renk}60` : '1px solid rgba(255, 255, 255, 0.2)'
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        background: notBilgisi ? `linear-gradient(90deg, ${notBilgisi.renk}, ${notBilgisi.renk}dd)` : 
                                   'linear-gradient(90deg, #1976d2, #1565c0)'
                      }
                    }}
                  >
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: theme.text.primary, mb: 0.5 }}>
                        {ders.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.text.tertiary }}>
                        ⭐ {ders.credit} Kredi
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                      <Box sx={{ flex: 1 }}>
                        <input
                          type="number"
                          placeholder="Vize"
                          value={notlar.midterm}
                          onChange={(e) => {
                            var yeniNotlar = {
                              ...kullaniciVerisi.grades,
                              [key]: { ...notlar, midterm: e.target.value }
                            };
                            notlariGuncelle(yeniNotlar)
                          }}
                          style={{
                            width: '100%',
                            padding: '14px 16px',
                            border: '2px solid ' + theme.border,
                            borderRadius: '12px',
                            fontSize: '16px',
                            background: theme.bg.paper,
                            color: theme.text.primary,
                            outline: 'none',
                            transition: 'all 0.3s ease',
                            boxSizing: 'border-box'
                          }}
                          onFocus={(e) => e.target.style.borderColor = '#1976d2'}
                          onBlur={(e) => e.target.style.borderColor = theme.border}
                        />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <input
                          type="number"
                          placeholder="Final"
                          value={notlar.final}
                          onChange={(e) => {
                            var yeniNotlar = {
                              ...kullaniciVerisi.grades,
                              [key]: { ...notlar, final: e.target.value }
                            };
                            notlariGuncelle(yeniNotlar);
                          }}
                          style={{
                            width: '100%',
                            padding: '14px 16px',
                            border: '2px solid ' + theme.border,
                            borderRadius: '12px',
                            fontSize: '16px',
                            background: theme.bg.paper,
                            color: theme.text.primary,
                            outline: 'none',
                            transition: 'all 0.3s ease',
                            boxSizing: 'border-box'
                          }}
                          onFocus={(e) => e.target.style.borderColor = '#1976d2'}
                          onBlur={(e) => e.target.style.borderColor = theme.border}
                        />
                      </Box>
                    </Box>

                    {gerekenFinal !== null && !notlar.final && (
                      <Box sx={{ 
                        p: 2, 
                        mb: 2,
                        background: 'rgba(255, 152, 0, 0.15)',
                        border: '1px solid rgba(255, 152, 0, 0.3)',
                        borderRadius: 2
                      }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#ff9800' }}>
                          Geçmek için gereken final: {gerekenFinal.toFixed(2)}
                        </Typography>
                      </Box>
                    )}

                    {notBilgisi && (
                      <Box sx={{ 
                        p: 2.5,
                        background: `${notBilgisi.renk}20`,
                        border: `1px solid ${notBilgisi.renk}40`,
                        borderRadius: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <Box>
                          <Typography variant="body2" sx={{ color: theme.text.secondary }}>Ortalama</Typography>
                          <Typography variant="h4" sx={{ fontWeight: 700, color: notBilgisi.renk }}>
                            {ortalama}
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="h3" sx={{ fontWeight: 700, color: notBilgisi.renk }}>
                            {notBilgisi.harf}
                          </Typography>
                          <Typography variant="caption" sx={{ color: notBilgisi.renk, fontWeight: 600 }}>
                            {notBilgisi.gpa.toFixed(1)} GPA
                          </Typography>
                        </Box>
                      </Box>
                    )}
                  </Box>
                );
              })}
                  </>
                );
              })()}
            </>
          )}
        </Box>
      )}

      {aktifSekme == 0 && (
        <Fab
          color="primary"
          sx={{ 
            position: 'fixed', 
            bottom: 24, 
            right: 24,
            background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
            boxShadow: '0 12px 30px rgba(25,118,210,0.4)',
            '&:hover': {
              background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
              transform: 'scale(1.1)',
              boxShadow: '0 16px 40px rgba(25,118,210,0.5)'
            },
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            width: 64,
            height: 64
          }}
          onClick={() => setTakvimGoster(!takvimGoster)}
        >
          <CalendarMonth sx={{ fontSize: 28 }} />
        </Fab>
      )}

      <RegulationsInfo 
        open={yonetmelikGoster}
        onClose={() => setYonetmelikGoster(false)}
      />
    </Box>
  );
};

export default Dashboard;
