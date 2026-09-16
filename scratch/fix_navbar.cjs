const fs = require('fs');

let content = fs.readFileSync('components/ui/Navbar.vue', 'utf8');

const newScript = `const route = useRoute();
const router = useRouter();

const handleNavClick = (href) => {
  if (href === '#') {
    if (route.path === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
    return;
  }

  if (href.startsWith('#')) {
    if (route.path === '/') {
      scrollToSection(href);
    } else {
      router.push('/' + href);
    }
  }
};

const handleMobileNavClick = (href) => {
  isMobileMenuOpen.value = false;
  handleNavClick(href);
};`;

content = content.replace(/const handleMobileNavClick =[\s\S]*?};/, newScript);
content = content.replace(/@click\.prevent="scrollToSection\('#'\)"/g, '@click.prevent="handleNavClick(\'#\')"');
content = content.replace(/@click\.prevent="scrollToSection\(item\.href\)"/g, '@click.prevent="handleNavClick(item.href)"');

// Remove the direct :to values that confuse nuxt when we manually handle it anyway, 
// or point them correctly so right-click "Open in new tab" still works.
content = content.replace(/:to="item\.href"/g, ':to="route.path === \'/\' ? item.href : \'/\' + item.href"');
content = content.replace(/to="\/" @click\.prevent="handleNavClick\('#'\)"/g, ':to="route.path === \'/\' ? \'#\' : \'/\'" @click.prevent="handleNavClick(\'#\')"');

fs.writeFileSync('components/ui/Navbar.vue', content);

let footer = fs.readFileSync('components/ui/Footer.vue', 'utf8');
footer = footer.replace(/const { scrollToSection } = useScrollTo\(\);/, `const { scrollToSection } = useScrollTo();
const route = useRoute();
const router = useRouter();

const handleNavClick = (href) => {
  if (href === '#') {
    if (route.path === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/');
    }
    return;
  }

  if (href.startsWith('#')) {
    if (route.path === '/') {
      scrollToSection(href);
    } else {
      router.push('/' + href);
    }
  }
};`);

footer = footer.replace(/@click\.prevent="scrollToSection\('#'\)"/g, '@click.prevent="handleNavClick(\'#\')"');
footer = footer.replace(/@click\.prevent="scrollToSection\('#visi-misi'\)"/g, '@click.prevent="handleNavClick(\'#visi-misi\')"');
footer = footer.replace(/@click\.prevent="scrollToSection\('#program-prioritas'\)"/g, '@click.prevent="handleNavClick(\'#program-prioritas\')"');
footer = footer.replace(/@click\.prevent="scrollToSection\('#layanan'\)"/g, '@click.prevent="handleNavClick(\'#layanan\')"');

// Fix the `to` props in Footer
footer = footer.replace(/to="#visi-misi"/g, ':to="route.path === \'/\' ? \'#visi-misi\' : \'/#visi-misi\'"');
footer = footer.replace(/to="#program-prioritas"/g, ':to="route.path === \'/\' ? \'#program-prioritas\' : \'/#program-prioritas\'"');
footer = footer.replace(/to="#layanan"/g, ':to="route.path === \'/\' ? \'#layanan\' : \'/#layanan\'"');

fs.writeFileSync('components/ui/Footer.vue', footer);
