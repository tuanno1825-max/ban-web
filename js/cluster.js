// Shared JS cho các trang vệ tinh SEO Topic Cluster
function toggleClusterFaq(btn) {
  const item = btn.closest('.faq-item');
  const isActive = item.classList.contains('active');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
  if (!isActive) {
    item.classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof initAnalytics === 'function') {
    initAnalytics();
  }
});
