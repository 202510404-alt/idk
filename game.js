// 1. 캔버스 및 컨텍스트 가져오기 (도화지를 준비)
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 2. 플레이어 객체 정의 (우리의 네모 캐릭터)
let player = {
    x: 50,          // 시작 X 좌표
    y: canvas.height - 80, // 바닥에 붙여서 시작 (캔버스 높이 - 캐릭터 높이)
    width: 30,
    height: 50,
    color: 'cyan',
    speed: 5,       // 이동 속도
    dx: 0,          // X축 이동 속도 (키 누르면 -5 또는 +5)
    dy: 0           // Y축 이동 속도 (점프/중력용)
};

// 3. 키보드 입력 상태 저장
let keys = {
    right: false,
    left: false,
    up: false
};

// 4. 키 입력 이벤트 리스너 설정
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'd') keys.right = true;
    if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = true;
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === ' ') keys.up = true; // 스페이스바도 점프
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'd') keys.right = false;
    if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = false;
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === ' ') keys.up = false;
});


// 5. 게임 로직 업데이트 함수 (프레임마다 호출되어 상태를 변경함)
function update() {
    // ----------------- 이동 처리 -----------------
    player.dx = 0;
    if (keys.left) {
        player.dx = -player.speed;
    }
    if (keys.right) {
        player.dx = player.speed;
    }
    
    // 위치 적용
    player.x += player.dx;

    // ----------------- 경계선 체크 (벽에 부딪히지 않게) -----------------
    if (player.x < 0) {
        player.x = 0;
    }
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }
    
    // 여기서는 중력/점프 로직은 생략하고 이동만 구현했습니다.
}

// 6. 그리기 함수 (업데이트된 상태를 화면에 표시)
function draw() {
    // 화면 지우기 (이전 프레임 흔적 제거)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 플레이어 그리기
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// 7. 게임 루프 (게임의 심장)
function gameLoop() {
    update(); // 상태 업데이트
    draw();   // 화면 그리기
    
    // 다음 프레임 요청 (약 60fps)
    requestAnimationFrame(gameLoop);
}

// 게임 시작!
gameLoop();
