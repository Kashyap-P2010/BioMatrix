document.addEventListener('DOMContentLoaded', function() {
    if (window.innerWidth < 768) {
        return; 
    }

    const MAX_LEAVES = 50;
    const leaves = [];
    let currentLeafIndex = 0;

    const leafContainer = document.createElement('div');
    leafContainer.setAttribute('id', 'leaf-container');
    document.body.appendChild(leafContainer);

    for (let i = 0; i < MAX_LEAVES; i++) {
        const leaf = document.createElement('span');
        leaf.className = 'leaf';
        leaf.style.display = 'none'; 
        leafContainer.appendChild(leaf);
        leaves.push(leaf);
    }

    const throttledCreateLeaf = throttle(triggerLeaf, 16);

    document.addEventListener('mousemove', function(e) {
        throttledCreateLeaf(e.pageX, e.pageY);
    });

    function triggerLeaf(x, y) {
        const leaf = leaves[currentLeafIndex];
        
        currentLeafIndex = (currentLeafIndex + 1) % MAX_LEAVES;

        leaf.style.animation = 'none';
        leaf.offsetHeight; 
        leaf.style.animation = '';

        leaf.style.left = x + 'px';
        leaf.style.top = y + 'px';
        leaf.style.display = 'block';

        const size = Math.random() * 20 + 10; 
        const rotation = Math.random() * 360;
        const animationDuration = Math.random() * 1.5 + 1; 

        leaf.style.width = size + 'px';
        leaf.style.height = size / 2 + 'px';
        leaf.style.setProperty('--rotation-end', rotation + 'deg');
        
        leaf.style.animation = `fall ${animationDuration}s linear forwards`;

        setTimeout(() => {
            leaf.style.display = 'none';
        }, animationDuration * 1000);
    }

    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
});