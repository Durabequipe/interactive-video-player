# WebDoc

__Exemple de TimelineJSON__

- 📚 La propriété `videos` est une _HashMap_, instance de `Map`.
- 📚 la propriété `interactions.id` correspond à l'identifiant de la vidéo suivante dans la _HashMap_.

```json
{
    "data": {
        "id": "98cdc820-e51e-4636-9ada-bb3d7e132f4a",
        "entrypointId": "98cdc84c-c666-4e7b-bcd2-653ba0f23c5d",
        "videos": [
            {
                "paths": [
                    "https://durabequipe.tarrit.ch/storage/videos/X5QSQHXARzfE0HkDjDHiVEfQvYRNy8-metaMDEuIDAxIC0gQnJlZi4gSidhaSBkcmFndWXMgSBjZXR0ZSBmaWxsZS4ubXA0-.mp4",
                    "https://durabequipe.tarrit.ch/storage/videos/0VgPlyYIb3m2Mu3vKFZvjFKilHuFlD-metaMDEuIDAxIC0gQnJlZi4gSidhaSBkcmFndWXMgSBjZXR0ZSBmaWxsZS4ubXA0-.mp4"
                ],
                "interactionPosition": "FULL",
                "popupDuration": 5,
                "text": "Quel est le nom de ce personnage ?",
                "interactions": [
                    {
                        "id": "98cdc892-40e0-4dcb-b10d-bb6d3d86eb2a",
                        "content": "<p><strong>Clique ici </strong><em>stp</em></p>"
                    }
                ]
            },
            {
                "paths": [
                    "https://durabequipe.tarrit.ch/storage/videos/dXG7UhzEO4Awp6OOdaBqE0F86F2yGv-metaMDIuIDAyIC0gQnJlZi4gSmUgcmVtZXRzIHRvdXQgYcyAIGRlbWFpbi4ubXA0-.mp4",
                    "https://durabequipe.tarrit.ch/storage/videos/1lv5zSKmpvCM4J2OAfFJKGUtPDDVMS-metaMDIuIDAyIC0gQnJlZi4gSmUgcmVtZXRzIHRvdXQgYcyAIGRlbWFpbi4ubXA0-.mp4"
                ],
                "interactionPosition": "FULL",
                "popupDuration": 5,
                "text": "Quel est le nom de ce personnage ?",
                "interactions": []
            }
        ]
    }
}
```

