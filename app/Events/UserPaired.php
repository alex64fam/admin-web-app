<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UserPaired
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    protected int $userId;
    protected String $message;

    /**
     * Create a new event instance.
     */
    public function __construct(int $userId, String $mesage = '¡Emparejamiento exitoso!')
    {
        $this->userId = $userId;
        $this->message = $mesage;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('pairing.' . $this->userId),
        ];
    }

    public function broadcastAs(): String
    {
        return 'pairing-success';
    }

    public function broadcastWith(): array
    {
        return [
            'user_id' => $this->userId,
            'message' => $this->message,
        ];
    }
}
