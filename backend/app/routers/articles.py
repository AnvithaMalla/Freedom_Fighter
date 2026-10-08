from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, selectinload

from app.database import get_db
from app.models.article import Article

router = APIRouter(
    prefix="/api/articles",
    tags=["Articles"]
)


# ============================================================
# GET ALL ARTICLES
# ============================================================

@router.get("/")
def get_articles(db: Session = Depends(get_db)):
    articles = (
        db.query(Article)
        .options(selectinload(Article.images))
        .order_by(Article.article_id)
        .all()
    )

    return [
        {
            "article_id": article.article_id,

            # Title
            "title": article.title,
            "title_telugu": article.title_telugu,

            # Context / Description
            "description": article.description,
            "description_telugu": article.description_telugu,

            # Full Article Content
            "content": article.content,
            "content_telugu": article.content_telugu,

            # Images
            "images": [
                {
                    "image_id": image.image_id,
                    "image_url": image.image_url,
                    "caption": image.caption,
                    "image_order": image.image_order,
                }
                for image in article.images
            ],
        }
        for article in articles
    ]


# ============================================================
# GET SINGLE ARTICLE
# ============================================================

@router.get("/{article_id}")
def get_article(
    article_id: int,
    db: Session = Depends(get_db)
):
    article = (
        db.query(Article)
        .options(selectinload(Article.images))
        .filter(Article.article_id == article_id)
        .first()
    )

    if not article:
        raise HTTPException(
            status_code=404,
            detail="Article not found"
        )

    return {
        "article_id": article.article_id,

        # Title
        "title": article.title,
        "title_telugu": article.title_telugu,

        # Context / Description
        "description": article.description,
        "description_telugu": article.description_telugu,

        # Full Article Content
        "content": article.content,
        "content_telugu": article.content_telugu,

        # Images
        "images": [
            {
                "image_id": image.image_id,
                "image_url": image.image_url,
                "caption": image.caption,
                "image_order": image.image_order,
            }
            for image in article.images
        ],
    }