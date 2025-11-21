import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Box, Accordion, AccordionSummary, AccordionDetails, Chip, Alert } from '@mui/material';
import { Close, ExpandMore, Info, School, Warning, CheckCircle, Error } from '@mui/icons-material';
import { useTheme } from '../context/ThemeContext';

const RegulationsInfo = ({ open, onClose }) => {
  const { theme } = useTheme();
  
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ 
        sx: { 
          borderRadius: 4,
          background: theme.bg.card,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${theme.border}`
        } 
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
        color: 'white',
        py: 3
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box sx={{ width: 40, height: 40, background: 'white', borderRadius: 2, p: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/trulogo.png" alt="TRÜ" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            TRÜ Yönetmelik Kuralları
          </Typography>
        </Box>
        <IconButton 
          onClick={onClose} 
          sx={{ 
            color: 'white',
            '&:hover': { background: 'rgba(255,255,255,0.1)' }
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ mt: 2, background: theme.bg.primary }}>
        <Accordion defaultExpanded sx={{ 
          background: theme.bg.card,
          border: `1px solid ${theme.border}`,
          borderRadius: 3,
          mb: 2,
          '&:before': { display: 'none' }
        }}>
          <AccordionSummary 
            expandIcon={<ExpandMore sx={{ color: theme.text.primary }} />}
            sx={{ background: theme.bg.paper }}
          >
            <Typography sx={{ 
              fontWeight: 700, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              color: theme.text.primary,
              fontSize: '1.1rem'
            }}>
              <Warning sx={{ color: '#ff6b35' }} />
              Devamsızlık Kuralları
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ background: theme.bg.card }}>
            <Alert 
              severity="error" 
              icon={<Error />}
              sx={{ 
                mb: 3,
                background: 'linear-gradient(135deg, rgba(139, 0, 0, 0.1) 0%, rgba(139, 0, 0, 0.05) 100%)',
                border: '1px solid rgba(139, 0, 0, 0.2)',
                borderRadius: 3
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                ⚠️ Kritik Uyarı: Devamsızlık Sınırını Aşmak = Dersten Kalmak
              </Typography>
              <Typography variant="body2">
                Sınırı aştığınızda final sınavına giremez ve "D" (Devamsız) notu alırsınız.
              </Typography>
            </Alert>

            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
              gap: 3,
              mb: 3
            }}>
              <Box sx={{
                p: 3,
                background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(25, 118, 210, 0.05) 100%)',
                border: '2px solid rgba(25, 118, 210, 0.2)',
                borderRadius: 4
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <CheckCircle sx={{ color: '#1976d2' }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, color: theme.text.primary }}>
                    Teorik Dersler
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: theme.text.secondary, mb: 2 }}>
                  Matematik, Fizik, İngilizce, İş Sağlığı, Bilg. Müh. Giriş, Bilgisayarın Temelleri
                </Typography>
                <Box sx={{ 
                  textAlign: 'center',
                  p: 2,
                  background: 'rgba(25, 118, 210, 0.1)',
                  borderRadius: 3,
                  border: '1px solid rgba(25, 118, 210, 0.3)'
                }}>
                  <Typography variant="h3" sx={{ fontWeight: 900, color: '#1976d2', lineHeight: 1 }}>
                    %30
                  </Typography>
                  <Typography variant="caption" sx={{ color: theme.text.secondary, fontWeight: 600 }}>
                    DEVAMSIŹLIK HAKKI
                  </Typography>
                </Box>
              </Box>

              <Box sx={{
                p: 3,
                background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(255, 107, 53, 0.05) 100%)',
                border: '2px solid rgba(255, 107, 53, 0.2)',
                borderRadius: 4
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Warning sx={{ color: '#ff6b35' }} />
                  <Typography variant="h6" sx={{ fontWeight: 700, color: theme.text.primary }}>
                    Yapısal Programlama
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: theme.text.secondary, mb: 2 }}>
                  Uygulama ağırlıklı ders olduğu için daha sıkı devam kuralları vardır
                </Typography>
                <Box sx={{ 
                  textAlign: 'center',
                  p: 2,
                  background: 'rgba(255, 107, 53, 0.1)',
                  borderRadius: 3,
                  border: '1px solid rgba(255, 107, 53, 0.3)'
                }}>
                  <Typography variant="h3" sx={{ fontWeight: 900, color: '#ff6b35', lineHeight: 1 }}>
                    %20
                  </Typography>
                  <Typography variant="caption" sx={{ color: theme.text.secondary, fontWeight: 600 }}>
                    DEVAMSIŹLIK HAKKI
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{
              p: 3,
              background: 'linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(76, 175, 80, 0.05) 100%)',
              border: '2px solid rgba(76, 175, 80, 0.2)',
              borderRadius: 4,
              mb: 3
            }}>
              <Typography variant="h6" sx={{ 
                fontWeight: 700, 
                color: theme.text.primary,
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <Info sx={{ color: '#4caf50' }} />
                Pratik Örnekler
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                <Box sx={{ 
                  p: 2, 
                  background: 'rgba(76, 175, 80, 0.1)', 
                  borderRadius: 2,
                  border: '1px solid rgba(76, 175, 80, 0.3)'
                }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#4caf50', mb: 1 }}>
                    ✅ GEÇER
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.text.secondary }}>
                    9/9 saat devamsızlık<br/>
                    (Sınırda ama henüz aşmamış)
                  </Typography>
                </Box>
                <Box sx={{ 
                  p: 2, 
                  background: 'rgba(139, 0, 0, 0.1)', 
                  borderRadius: 2,
                  border: '1px solid rgba(139, 0, 0, 0.3)'
                }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#8b0000', mb: 1 }}>
                    ❌ KALIR
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.text.secondary }}>
                    10/9 saat devamsızlık<br/>
                    (Sınır aşıldı, "D" notu)
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{
              p: 2.5,
              background: theme.bg.paper,
              border: `1px solid ${theme.border}`,
              borderRadius: 3
            }}>
              <Typography variant="body2" sx={{ 
                color: theme.text.secondary,
                lineHeight: 1.6,
                fontSize: '0.875rem'
              }}>
                <strong>Hesaplama:</strong> 15 haftalık dönem (22 Eyl 2025 - 02 Oca 2026)<br/>
                • Matematik: 4 saat/hafta × 15 = 60 saat → %30 = 18 saat hakkı<br/>
                • Yapısal Prog.: 3 saat/hafta × 15 = 45 saat → %20 = 9 saat hakkı
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ 
          background: theme.bg.card,
          border: `1px solid ${theme.border}`,
          borderRadius: 3,
          mb: 2,
          '&:before': { display: 'none' }
        }}>
          <AccordionSummary 
            expandIcon={<ExpandMore sx={{ color: theme.text.primary }} />}
            sx={{ background: theme.bg.paper }}
          >
            <Typography sx={{ 
              fontWeight: 700, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              color: theme.text.primary,
              fontSize: '1.1rem'
            }}>
              <School sx={{ color: '#1976d2' }} />
              Not Sistemi
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ background: theme.bg.card }}>
            <Box sx={{ mb: 2 }}>
              <Chip label="Değerlendirme Sistemi" color="primary" size="small" sx={{ mb: 1 }} />
              <Typography variant="body2" paragraph>
                • <strong>Bağıl Değerlendirme:</strong> Öğrenci sayısı 10'dan fazla olan derslerde
              </Typography>
              <Typography variant="body2" paragraph>
                • <strong>Mutlak Değerlendirme:</strong> Öğrenci sayısı 10 ve altında olan derslerde
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Chip label="Başarı Notu Hesaplama" color="secondary" size="small" sx={{ mb: 1 }} />
              <Typography variant="body2" paragraph>
                <strong>Ham Başarı Notu (HBN) = Yarıyıl İçi + Final</strong>
              </Typography>
              <Typography variant="body2" paragraph>
                • Yarıyıl içi: Ara sınav, ödev, proje, lab vb.
              </Typography>
              <Typography variant="body2" paragraph>
                • Final sınavından <strong>en az 45</strong> almak zorunludur
              </Typography>
            </Box>

            <Box sx={{ p: 2, bgcolor: '#e8f5e9', borderRadius: 2, mb: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                Mutlak Değerlendirme - Harf Notları:
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                <Typography variant="body2">• AA: 90-100 (4.0)</Typography>
                <Typography variant="body2">• BA: 80-89 (3.5)</Typography>
                <Typography variant="body2">• BB: 75-79 (3.0)</Typography>
                <Typography variant="body2">• CB: 70-74 (2.5)</Typography>
                <Typography variant="body2">• CC: 60-69 (2.0) ✓</Typography>
                <Typography variant="body2">• DC: 50-59 (1.5) ✓*</Typography>
                <Typography variant="body2">• DD: 40-49 (1.0) ✗</Typography>
                <Typography variant="body2">• FD: 30-39 (0.5) ✗</Typography>
                <Typography variant="body2">• FF: 0-29 (0.0) ✗</Typography>
              </Box>
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                * DC notu: Yarıyıl not ortalaması 2.00+ ise başarılı
              </Typography>
            </Box>

            <Box sx={{ p: 2, bgcolor: '#fff3e0', borderRadius: 2, mb: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#e65100', mb: 1 }}>
                <Warning sx={{ fontSize: 16, mr: 0.5 }} />
                Devamsızlık Cezası:
              </Typography>
              <Typography variant="body2">
                Devamsız öğrencilere doğrudan <strong>"D" (Devamsız)</strong> notu verilir ve final sınavına giremezler.
              </Typography>
            </Box>

            <Box sx={{ p: 2, bgcolor: '#e3f2fd', borderRadius: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                AGNO (Ağırlıklı Genel Not Ortalaması):
              </Typography>
              <Typography variant="body2">
                Tüm derslerin 4'lük notları × Kredi / Toplam Kredi
              </Typography>
              <Typography variant="caption" display="block" sx={{ mt: 0.5 }}>
                Sonuç virgülden sonra iki hane yuvarlanır.
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ 
          background: theme.bg.card,
          border: `1px solid ${theme.border}`,
          borderRadius: 3,
          mb: 2,
          '&:before': { display: 'none' }
        }}>
          <AccordionSummary 
            expandIcon={<ExpandMore sx={{ color: theme.text.primary }} />}
            sx={{ background: theme.bg.paper }}
          >
            <Typography sx={{ 
              fontWeight: 700, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              color: theme.text.primary,
              fontSize: '1.1rem'
            }}>
              <CheckCircle sx={{ color: '#4caf50' }} />
              Muafiyet Kuralları
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ background: theme.bg.card }}>
            <Box sx={{ mb: 2 }}>
              <Chip label="Muafiyet Başvurusu" color="primary" size="small" sx={{ mb: 1 }} />
              <Typography variant="body2" paragraph>
                • Muafiyet başvuruları eğitim-öğretime başladıkları yarıyılın <strong>ilk iki haftası içinde</strong> yapılır.
              </Typography>
              <Typography variant="body2" paragraph>
                • Sonraki yarıyıl/yıllarda yapılacak muafiyet talepleri kabul edilmez.
              </Typography>
              <Typography variant="body2" paragraph>
                • Başvuru için onaylanmış ders içerikleri ve transkript gereklidir.
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Chip label="Muafiyet Koşulları" color="secondary" size="small" sx={{ mb: 1 }} />
              <Typography variant="body2" paragraph>
                • Muafiyet istenen dersin içeriği ile eşdeğer dersin içeriğinin <strong>en az %75 uyumlu</strong> olması gerekir.
              </Typography>
              <Typography variant="body2" paragraph>
                • AKTS kredisi eşdeğer dersin AKTS değerinden az olmaması şarttır.
              </Typography>
              <Typography variant="body2" paragraph>
                • Muaf olunan ders kredisi toplam derslerin <strong>yarısını geçemez</strong>.
              </Typography>
            </Box>

            <Box sx={{ p: 2, bgcolor: '#e8f5e9', borderRadius: 2, mb: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                Yabancı Dil Muafiyeti:
              </Typography>
              <Typography variant="body2" paragraph>
                • Yeterlilik sınavında 100 üzerinden <strong>en az 60</strong> alan öğrenciler muaf sayılır.
              </Typography>
              <Typography variant="body2">
                • Muaf olan öğrenciler için devamsızlık takibi yapılmaz.
              </Typography>
            </Box>

            <Box sx={{ p: 2, bgcolor: '#fff3e0', borderRadius: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#e65100', mb: 1 }}>
                Uyum İşlemi:
              </Typography>
              <Typography variant="body2" paragraph>
                • 30 krediden az: 1. sınıf
              </Typography>
              <Typography variant="body2" paragraph>
                • 30-89 kredi: 2. sınıf
              </Typography>
              <Typography variant="body2" paragraph>
                • 90-149 kredi: 3. sınıf
              </Typography>
              <Typography variant="body2">
                • 150+ kredi: 4. sınıf
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Box sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 1 }}>
            <strong>Kaynak:</strong> Trabzon Üniversitesi Ön Lisans ve Lisans Eğitim-Öğretim Yönetmeliği ve Ders Muafiyet ve Uyum Yönergesi
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            Son Güncelleme: 19.02.2019 - Senato Kararı No: 10
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
            Güncel yönetmelik ve yönergeler için <strong>tru.edu.tr</strong> adresini ziyaret ediniz.
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default RegulationsInfo;
