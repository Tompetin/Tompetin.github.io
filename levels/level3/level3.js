function blockIPs() {
    // Get the checkboxes that the player selected
    const ip1Checked = document.getElementById('ip1').checked;
    const ip2Checked = document.getElementById('ip2').checked;
    const ip10Checked = document.getElementById('ip192168110').checked;
    const ip11Checked = document.getElementById('ip192168111').checked;
    const ip12Checked = document.getElementById('ip192168112').checked;
    const ip13Checked = document.getElementById('ip192168113').checked;
    const ip14Checked = document.getElementById('ip192168114').checked;
    const ip15Checked = document.getElementById('ip192168115').checked;

    // Store the IPs to block if selected
    let blockedIPs = [];

    if (ip1Checked) blockedIPs.push('192.168.1.1');
    if (ip1Checked) blockedIPs.push('192.168.1.2');
    if (ip10Checked) blockedIPs.push('192.168.1.10');
    if (ip11Checked) blockedIPs.push('192.168.1.11');
    if (ip12Checked) blockedIPs.push('192.168.1.12');
    if (ip13Checked) blockedIPs.push('192.168.1.13');
    if (ip14Checked) blockedIPs.push('192.168.1.14');
    if (ip15Checked) blockedIPs.push('192.168.1.15');

    // Check if only malicious IPs were selected
    const correctBlockedIPs = ['192.168.1.10', '192.168.1.11', '192.168.1.12'];
    const isCorrect = blockedIPs.every(ip => correctBlockedIPs.includes(ip)) && blockedIPs.length === correctBlockedIPs.length;

    if (isCorrect) {
        document.getElementById('feedback').innerHTML = "<strong>Success!</strong> DDoS attack mitigated by blocking the correct IP(s): " + blockedIPs.join(', ') + ".";
    } else if (blockedIPs.length === 0) {
        document.getElementById('feedback').innerHTML = "<strong>No IPs selected!</strong> Try again.";
    } else {
        document.getElementById('feedback').innerHTML = "<strong>Failure!</strong> You selected incorrect IP(s). The following IP(s) were wrongly blocked: " + blockedIPs.filter(ip => !correctBlockedIPs.includes(ip)).join(', ') + ".";
    }
}
