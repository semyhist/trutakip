import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Box, Accordion, AccordionSummary, AccordionDetails, Chip } from '@mui/material';
import { Close, ExpandMore, Info, School, Warning } from '@mui/icons-material';

const RegulationsInfo = ({ open, onClose }) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
        color: 'white'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <School />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            TRÜ Yönetmelik Kuralları
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Info color="primary" />
              Devamsızlık Kuralları
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ mb: 2 }}>
              <Chip label="Teorik Dersler" color="primary" size="small" sx={{ mb: 1 }} />
              <Typography variant="body2" paragraph>
                • Öğrencilerin derslerin <strong>en az %70'ine</strong> devam etmeleri zorunludur.
              </Typography>
              <Typography variant="body2" paragraph>
                • Bu, teorik derslerde toplamda <strong>%30 oranında devamsızlık hakkı</strong> olduğu anlamına gelir.
              </Typography>
              <Typography variant="body2" paragraph>
                • 14 haftalık standart eğitim dönemi üzerinden dersin haftalık saatine göre hesaplanır.
              </Typography>
            </Box>

            <Box sx={{ p: 2, bgcolor: '#fff3e0', borderRadius: 2, mb: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#e65100', display: 'flex', alignItems: 'center', gap: 1 }}>
                <Warning />
                Önemli Uyarı
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Bu devam şartlarını sağlamayan öğrenciler, o dersin yarıyıl sonu (final) sınavına giremezler ve dersten <strong>"D" (Devamsız)</strong> notu ile kalmış sayılırlar.
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Info color="primary" />
              Not Sistemi
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
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

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Info color="primary" />
              Muafiyet Kuralları
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
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
